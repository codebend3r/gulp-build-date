Gulp Build Date
====================
![gulp-build-date build status](https://travis-ci.org/crivas/gulp-build-date.svg?branch=master)

> Populates the build date and version from bower.json into a json file, used to output information on web page.

Basic Example

```js
var buildDate = require('gulp-build-date');

gulp.task('build-website', function () {

  return gulp.src(['app/js/**/*.js'])
    .pipe(buildDate({
        bowerJson: './bower.json'
      }))
    .pipe(gulp.dest('/output'))

});
```
