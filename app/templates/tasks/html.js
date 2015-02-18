'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toHtml = [
  '**/*.html'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, HtmlPaths) {
  // Set value of paths to either the default or user entered
  HtmlPaths = HtmlPaths || toHtml;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var HtmlTask = function (path) {
    return gulp.src(HtmlPaths)
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('html', function () {
    return HtmlTask(HtmlPaths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('html:watch', function () {
    return gulp.watch(HtmlPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return HtmlTask(event.path.absolute);
      });
  });
}
