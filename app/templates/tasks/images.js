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
var toImages = [
  'images/**/*'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, ImagesPaths) {
  // Set value of paths to either the default or user entered
  ImagesPaths = ImagesPaths || toImages;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var ImagesTask = function (path) {
    return gulp.src(ImagesPaths)
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('images', function () {
    return ImagesTask(ImagesPaths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('images:watch', function () {
    return gulp.watch(ImagesPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return ImagesTask(event.path.absolute);
      });
  });
}
