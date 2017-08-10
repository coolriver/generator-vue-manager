'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-vue-manager:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({projName: 'test1'});
  });

  it('creates files', () => {
    assert.file([
      'package.json'
    ]);
  });
});
