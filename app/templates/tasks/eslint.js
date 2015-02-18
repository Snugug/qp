'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    lint = require('gulp-eslint'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toEslint = [
  'js/**/*.js'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, EslintPaths) {
  // Set value of paths to either the default or user entered
  EslintPaths = EslintPaths || toEslint;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var EslintTask = function (path) {
    return gulp.src(EslintPaths)
      .pipe(lint())
      .pipe(lint.format())
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('eslint', function () {
    return EslintTask(EslintPaths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('eslint:watch', function () {
    return gulp.watch(EslintPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return EslintTask(event.path.absolute);
      });
  });
}
