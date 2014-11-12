'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;


var gss_compiler = require('gss-compiler');

var PLUGIN_NAME = 'gulp-gss';



function gulpGss() {
    
    var stream = through.obj(function(file, enc, cb){
        
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
        }

        if (file.isBuffer()){
            try {
                file.contents = new Buffer( JSON.stringify( gss_compiler.compile(file.contents.toString()) ) );
            } catch (e) {
                console.log('It has been an error.');
                console.trace();
                this.emit('error', new PluginError(PLUGIN_NAME, 'Compiling error. ' + e, {
                    fileName: file.path,
                    showStack: true
                }));
            }
        }


        // make sure the file goes through the next gulp plugin
        this.push( file );


        // tell the stream engine that we are done with this file
        cb();
    });


    // return the file stream
    return stream;
};


// export the plugin function
module.exports = gulpGss;
