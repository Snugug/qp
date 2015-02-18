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
var toFonts = [
  'fonts/**/*'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, FontsPaths) {
  // Set value of paths to either the default or user entered
  FontsPaths = FontsPaths || toFonts;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var FontsTask = function (path) {
    return gulp.src(FontsPaths)
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('fonts', function () {
    return FontsTask(FontsPaths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('fonts:watch', function () {
    return gulp.watch(FontsPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return FontsTask(event.path.absolute);
      });
  });
}
