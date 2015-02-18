'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    _s = require('underscore.string'),
    yosay = require('yosay'),
    settings = {};


var NorthGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // have North greet the user
    this.log(yosay('Let\'s Build a Quick Prototype!'));

    var prompts = [{
      type: 'string',
      name: 'projectName',
      message: 'What\'s your prototype\'s name?' + chalk.red(' (Required)'),
      validate: function (input) {
        if (input === '') {
          return 'Please enter your prototype\'s name';
        }
        return true;
      }
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.slug = _s.slugify(this.projectName);
      this.folder = this.options['init'] ? './' : this.slug + '/';

      done();
    }.bind(this));
  },

  configuring: function () {
    //////////////////////////////
    // Folder Enforcement
    //////////////////////////////
    this.destinationRoot(this.folder);

    //////////////////////////////
    // Settings
    //////////////////////////////
    settings = {
      project: this.projectName,
      slug: this.slug
    };

    this.config.set(settings);

    this.copy('editorconfig', '.editorconfig');
    this.copy('eslintrc', '.eslintrc');
    this.copy('gitignore', '.gitignore');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
  },

  default: function () {
    // Lint
    // this.composeWith('north:jshint', {
    //   options: {
    //     runner: this.runner,
    //     server: this.server,
    //     'no-gemfile': true,
    //     'no-package': true,
    //     'skip-install': this.options['skip-install']
    //   }
    // });
    // Sass Structure
    // this.composeWith('north:sass', {
    //   options: {
    //     'skip-install': this.options['skip-install']
    //   }
    // });
  },

  writing: function () {
    this.copy('Gulpfile.js', 'Gulpfile.js');

    this.template('index.html', 'index.html');
    this.directory('tasks', 'tasks');

    this.copy('app.js', 'js/app.js');
    this.template('_style.scss', 'sass/style.scss');

    this.mkdir('fonts');
    this.mkdir('images');
    this.mkdir('js');
  },

  install: function () {
    //////////////////////////////
    // Install dependencies unless --skip-install is passed
    //////////////////////////////
    if (!this.options['skip-install']) {
      var bower = true,
          npm = true;

      if (bower || npm) {
        this.installDependencies({
          bower: bower,
          npm: npm
        });
      }
    }
  },

  end: function () {
    //////////////////////////////
    // If the --git flag is passed, initialize git and add for initial commit
    //////////////////////////////
    // if (this.options['git']) {
    //   sh.run('git init');
    //   sh.run('git add . && git commit -m "North Generation"');
    // }
  }
});

module.exports = NorthGenerator;
