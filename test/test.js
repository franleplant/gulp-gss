'use strict';

var assert = require('assert');
var fs = require('fs');
var es = require('event-stream');
var File = require('vinyl');
var gulp = require('gulp');
var gss = require('../');

describe('gulp-gss', function() {
    describe('in buffer mode', function() {

        describe('vfl compilation', function () {
            it('should compile .gss file and return a json ast', function(done) {

                // create the fake file
                var fixture = new File({
                    contents: fs.readFileSync('./fixtures/vfl.gss')
                });

                // Create a prefixer plugin stream
                var gss_stream = gss();
         
                // write the fake file to it
                gss_stream.write(fixture);

                // wait for the file to come back out
                gss_stream.once('data', function(file) {
                    // make sure it came out the same way it went in
                    assert(file.isBuffer(), 'plugin only works with Buffers');

                    // check the contents
                    assert.deepEqual(  JSON.parse(file.contents.toString('utf8')), require('./expected/vfl.json') );
                    done();
                });
            });     
        });
    });
});
