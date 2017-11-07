'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const esprima = require('esprima');
const astQuery = require('ast-query');
const insertAssign = require('../../libs/utils').insertAssign;

const FIRST_MENU = '*.作为一级页面';

const validator = {
  notEmpty(warning) {
    return v => {
      if (`${v}`.length) {
        return true;
      }

      return warning;
    };
  }
};

const PAGE_TYPE_MAP = {
  SEARCH_LIST: '简单列表查询页面',
  OP_LIST: '列表增删改查页面',
  CHART: '图表页面',
};

module.exports = class extends Generator {
  initializing() {
    this.conflicter.force = true; // 强制覆盖文件
    const menuPath = path.resolve(this.destinationPath('src/config/menu.js'));
    const menuContent = this.fs.read(menuPath);
    const queryTree = astQuery(menuContent,
      {
        format: {
          indent: {
            style: '  ',
          },
        },
        comment: true,
      },
      {
        attachComment: true,
        sourceType: 'module',
      }
    );

    this.menuPath = menuPath;
    this.queryTree = queryTree;
    this.menuList = queryTree.var('menuConf').value().key('list').nodes[0].elements; // 获取menu.list
    this.fistMenu = this.menuList
      .filter(item => item.properties.some(item => item.key.name === 'children')); // 过滤掉非二级菜单项
    this.menus = this.fistMenu
      .map(item => item.properties.filter(item => item.key.name === 'title')[0].value.value) // 获取二级菜单项的title的value
      .map((item, index) => `${index + 1}.${item}`); // 加上标号前缀，以免重名
    this.menus.unshift(FIRST_MENU);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      '欢迎使用 ' + chalk.red('generator-vue-manager') + ' 生成器!'
    ));

    this.props = {};
    const { menus } = this;
    const prompts = [
      {
        type: 'list',
        name: 'pageMenu',
        message: '请选择页面的属的菜单（如果页面即为一级菜单，请选第一个选项）:',
        choices: menus,
      },
      {
        type: 'input',
        name: 'pageName',
        message: chalk.green('请输入要创建的页面名称（会作为新生成的目录的名称，所以，用英文吧）:'),
        validate: validator.notEmpty('名称不为能空')
      },
      {
        type: 'input',
        name: 'pageTitle',
        message: chalk.green('请输入要创建的页面标题(页面展示标题，想输入啥都可以):'),
        validate: validator.notEmpty('标题不为能空')
      },
      {
        type: 'input',
        name: 'pageRoute',
        message: chalk.green('请输入页面路由(例如: /page/path):'),
        validate: validator.notEmpty('页面路由不为能空')
      },
      {
        type: 'list',
        name: 'pageType',
        message: chalk.green('请选择页面类型:'),
        choices: Object.keys(PAGE_TYPE_MAP).map(key => PAGE_TYPE_MAP[key])
      }
    ];

    return this.prompt(prompts).then(props => {
      const { pageName, pageRoute } = props;

      Object.assign(this.props, props, {
        nameKebab: _.kebabCase(pageName),
        nameCamel: _.capitalize(_.camelCase(pageName)),
        pageRoute: pageRoute[0] === '/' ? pageRoute : `/${pageRoute}`,
      });
    });
  }

  _handleMenu() {
    const { queryTree } = this;
    const { nameCamel, nameKebab, pageTitle, pageRoute, pageMenu } = this.props;
    const insertDeclare = esprima.parse(`const ${nameCamel} = resolve => require(['@/views/${nameKebab}'], resolve);`);

    insertAssign(queryTree.tree.body, insertDeclare.body[0]);

    if (pageMenu === FIRST_MENU) { // 一级页面
      queryTree.var('menuConf').value().key('list').push(`\
        {
          title: '${pageTitle}',\
          icon: 'ios-star',\
          routeLink: '${pageRoute}',\
          component: ${nameCamel},\
          meta: {\
            title: '${pageTitle}'\
          }\
        }
      `);
    } else { // 二级页面
      const menuFormat = pageMenu.split('.').slice(1).join('.');
      let menuIndex = -1;
      this.menuList.some((item, i) => {
        if (item.properties.find(item => item.value.value === menuFormat)) {
          menuIndex = i;
          return true;
        }
      });

      console.log(`index*************************************: ${menuIndex}`);

      queryTree.var('menuConf').value().key('list').at(menuIndex).key('children').push(`\
        {
          title: '${pageTitle}',\
          routeLink: '${pageRoute}',\
          component: ${nameCamel},\
          meta: {\
            title: '${pageTitle}'\
          }\
        }
      `);
    }


    // console.log(queryTree.toString());
    this.fs.write(this.menuPath, queryTree.toString());
  }

  writing() {
    const { nameKebab, pageType } = this.props;
    const distPath = path.resolve(this.destinationPath(`src/views/${nameKebab}`));
    let templateSubPath = '';

    this.distPath = distPath;
    this._handleMenu();

    switch (pageType) {
      case PAGE_TYPE_MAP.CHART:
        templateSubPath = 'chart';
        break;
      case PAGE_TYPE_MAP.SEARCH_LIST:
        templateSubPath = 'search-list';
        break;
      case PAGE_TYPE_MAP.OP_LIST:
        templateSubPath = 'op-list';
        break;
      default:
        templateSubPath = '';
    }

    this.fs.copyTpl(
      this.templatePath(`${templateSubPath}/**`),
      distPath,
      this.props
    );
  }

  end() {
    this.log(`创建页面 ${this.props.nameKebab} 成功啦!`);
    this.log(`页面代码所在目录: ${chalk.green(this.distPath)}`);
  }
};
