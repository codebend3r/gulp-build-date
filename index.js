/**
 * Updated by crivas on 08/25/2015.
 */

'use strict';

var jsonfile = require('jsonfile'),
  git = require('git-rev'),
  _ = require('underscore-node'),
  fs = require('fs'),
  crypto = require('crypto'),
  md5sum = crypto.createHash('md5'),
  moment = require('moment'),
  through = require('through2'),
  gutil = require('gulp-util'),
  File = gutil.File;


module.exports = function (fileName, options) {

  var bowerJson;

  if (!_.isUndefined(options) && !_.isUndefined(options.bowerJson)) {
    if (typeof options.bowerJson === 'string') {
      bowerJson = jsonfile.readFileSync(options.bowerJson);
    } else if (typeof options.bowerJson === 'object') {
      bowerJson = options.bowerJson;
    }
  }

  var parsedObject = {};

  var bufferedContents = function (file, enc, cb) {

    cb();

  };

  var endBuffer = function (cb) {

    //var buildData = buildDateFile(function (data) {

    var self = this;

    git.branch(function (branchName) {

      parsedObject.branchName = branchName;
      parsedObject.date = moment().format('MM/DD/YYYY h:mm:ss a');
      if (bowerJson) parsedObject.version = bowerJson.version;
      gutil.log(gutil.colors.magenta('------------------------------------'));
      gutil.log(gutil.colors.magenta('build date:'), gutil.colors.green(parsedObject.date));
      gutil.log(gutil.colors.magenta('build branch:'), gutil.colors.green(parsedObject.branchName));
      if (bowerJson) gutil.log(gutil.colors.magenta('build version:'), gutil.colors.green(parsedObject.version));
      if (options && options.enableHash) {
        var buildData = JSON.stringify(parsedObject);
        var hash = md5sum.update(buildData).digest('hex');
        parsedObject.hashId = hash;
        gutil.log(gutil.colors.magenta('build hash:'), gutil.colors.green(hash));
      }
      gutil.log(gutil.colors.magenta('------------------------------------'));

      var buildInfo = JSON.stringify(parsedObject);

      var file = new File({
        cwd: __dirname,
        base: __dirname,
        path: __dirname + '/' + fileName,
        contents: new Buffer(buildInfo)
      });

      self.push(file);

      cb();


    });
  };

  /**
   * returns streamed content
   */
  return through.obj(bufferedContents, endBuffer);


};
