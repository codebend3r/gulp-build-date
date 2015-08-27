/**
 * Updated by crivas on 08/25/2015.
 */

'use strict';

var jsonfile = require('jsonfile'),
  _ = require('underscore-node'),
  fs = require('fs'),
  moment = require('moment'),
  through = require('through2'),
  gutil = require('gulp-util');

module.exports = function (file, options) {

  var bowerJson;

  if (!_.isUndefined(options.bowerJson)) {
    if (typeof options.bowerJson === 'string') {
      bowerJson = jsonfile.readFileSync(options.bowerJson);
    } else if (typeof options.bowerJson === 'object') {
      bowerJson = options.bowerJson;
    }
  }

  /**
   * populates with build information
   * @param object
   * @returns {object}
   */
  var buildDateFile = function (object) {

    var parsedObject = JSON.parse(object);
    parsedObject.date = moment().format('MM/DD/YYYY h:mm:ss a');
    parsedObject.version = bowerJson.version;
    gutil.log('build date:', parsedObject.date);
    gutil.log('build version:', parsedObject.version);
    return JSON.stringify(parsedObject);

  };

  /**
   *
   * @param file
   * @param enc
   * @param callback
   */
  var bufferedContents = function (file, enc, callback) {

    if (file.isStream()) {

      this.emit('error', new gutil.PluginError('gulp-build-date', 'Streams are not supported!'));
      callback();

    } else if (file.isNull()) {

      callback(null, file); // Do nothing if no contents

    } else {

      var ctx = file.contents.toString('utf8');
      var dateFile = buildDateFile(ctx);
      file.contents = new Buffer(dateFile);
      callback(null, file);

    }

  };

  /**
   * returns streamed content
   */
  return through.obj(bufferedContents);


};
