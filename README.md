Gulp Build Date
====================

Populates the build date and version from bower.json into a json file, used to output information on web page.

1. Basic Example

    var buildDate = require('gulp-build-date');

    gulp.task('build-website', function () {

      return gulp.src(['app/js/\**/\*.js'])
        .pipe(buildDate({
            bowerJson: './bower.json'
          }))
        .pipe(gulp.dest('/output'))

    });
