'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

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

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      '欢迎使用 ' + chalk.red('generator-vue-manager') + ' 生成器!'
    ));

    this.props = {};

    const prompts = [
      {
        type: 'input',
        name: 'projName',
        message: chalk.green('请输入要创建的项目名称（同时会作为新生成的目录的名称，所以，用英文吧）:'),
        validate: validator.notEmpty('项目名称不为能空')
      },
      {
        type: 'input',
        name: 'projDesc',
        message: chalk.green('请输入项目描述:'),
        default: '一个让你发家致富的项目'
      },
      {
        type: 'input',
        name: 'author',
        message: chalk.green('请输入作者大名:'),
        validate: validator.notEmpty('作者大名不能为空')
      }
    ];

    return this.prompt(prompts).then(props => {
      Object.assign(this.props, props);
    });
  }

  writing() {
    const { projName } = this.props;
    const distPath = path.resolve(this.destinationPath(projName));
    this.fs.copyTpl(
      this.templatePath('**'),
      distPath,
      this.props,
      {},
      {
        globOptions: {
          dot: true,
          ignore: [this.templatePath('node_modules/**'), 'static/*.ico']
        }
      }
    );

    this.fs.copy(this.templatePath('static/*.ico'), path.resolve(distPath, 'static'));
  }

  install() {
    const { projName } = this.props;
    const distPath = path.resolve(this.destinationPath(projName));
    process.chdir(distPath);
    this.installDependencies({ bower: false });
  }
};
