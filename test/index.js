'use strict';

var should = require('chai').should(),
  expect = require('chai').expect,
  assert = require('chai').assert,
  path = require('path'),
  gutil = require('gulp-util'),
  fs = require('fs'),
  buildDate = require('../index');

describe('gulp-build-date', function () {

  var getFile = function (filePath) {
    return new gutil.File({
      path: filePath,
      cwd: __dirname,
      base: path.dirname(filePath),
      contents: fs.readFileSync(filePath)
    });
  };

  it('should be defined', function () {

    assert.isDefined(buildDate, 'buildDate is defined');

  });

  it('should generate date and current git branch if available', function (cb) {

    var stream = buildDate({
      bowerJson: './test/fixtures/in/bower.json'
    });

    stream.on('data', function (file) {

      var changedFile = file.contents.toString('utf8');

      console.log('changedFile', changedFile);

      //expect(changedFile).to.have.string(startString);


      cb();

    });

    stream.write(getFile('./test/fixtures/in/config.json'));

  });

});
