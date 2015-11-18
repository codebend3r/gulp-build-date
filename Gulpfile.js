'use strict';

var gulp = require('gulp-help')(require('gulp')),
  gutil = require('gulp-util'),
  buildDate = require('./index.js');

gulp.task('test1', function () {

  return gulp.src('build-date.json')
    .pipe(buildDate('build-date.json'))
    .pipe(gulp.dest('./output'))
    .on('error', gutil.log);

});

gulp.task('test2', function () {

  return gulp.src('build-date.json')
    .pipe(buildDate('build-date.json', {
      enableHash: true
    }))
    .pipe(gulp.dest('./output'))
    .on('error', gutil.log);

});

gulp.task('test3', function () {

  return gulp.src('build-date.json')
    .pipe(buildDate('build-date.json', {
      bowerJson:  './bower.json',
      enableHash: true
    }))
    .pipe(gulp.dest('./output'))
    .on('error', gutil.log);

});
