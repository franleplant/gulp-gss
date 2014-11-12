'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;


var gss_compiler = require('gss-compiler');

const PLUGIN_NAME = 'gulp-gss';


// aux var to hold the gss compiler output
var ast;


function gulpGss() {
    
    var stream = through.obj(function(file, enc, cb){
        
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
        }

        if (file.isBuffer()){
            ast = gss_compiler.compile(file.contents);
        }


        // make sure the file goes through the next gulp plugin
        this.push( JSON.stringify(ast) );


        // tell the stream engine that we are done with this file
        cb();
    });


    // return the file stream
    return stream;
};


// export the plugin function
module.exports = gulpGss;
