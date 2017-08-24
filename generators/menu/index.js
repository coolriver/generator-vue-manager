'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const esprima = require('esprima');
const astQuery = require('ast-query');
const insertAssign = require('../../libs/utils').insertAssign;

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
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      '欢迎使用 ' + chalk.red('generator-vue-manager') + ' 生成器!'
    ));

    this.props = {};

    const prompts = [
      {
        type: 'input',
        name: 'menuName',
        message: chalk.green('请输入要创建的下拉菜单名称（菜单不对应实际页面，但可以容纳其它页面）:'),
        validate: validator.notEmpty('名称不为能空')
      }
    ];

    return this.prompt(prompts).then(props => {
      Object.assign(this.props, props);
    });
  }

  _handleMenu() {
    const menuPath = path.resolve(this.destinationPath('src/config/menu.js'));
    const menuContent = this.fs.read(menuPath);
    const { menuName } = this.props;
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

    queryTree.assignment('module.exports').value().key('list').push(`\
      {
        title: '${menuName}',\
        icon: 'android-menu',\
        children: []\
      }
    `);

    this.fs.write(menuPath, queryTree.toString());
  }

  writing() {
    this._handleMenu();
  }

  end() {
    this.log(`创建菜单 ${this.props.menuName} 成功啦，去页面上看看吧!(刚创建时菜单为空，需要往里面添加页面才行。)`);
  }
};
