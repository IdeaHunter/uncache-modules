# Uncache module [![Build Status](https://travis-ci.org/IdeaHunter/uncache-modules.svg?branch=master)](https://travis-ci.org/IdeaHunter/uncache-modules)

Helper for uncaching node modules to allow run tests within the same process as gulp tasks

## Installation

```sh
npm install uncache-modules
```

## Usage

```js
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var uncacheModules = require('uncache-modules');

var testServer;
gulp.task('run-test-server', function(cb) {
    if (testServer) {
        testServer.close();
        uncacheModules('./src');
    }
    testServer = require('./src/app');
    testServer.on('listening', cb);
});

gulp.task('run-tests', ['run-test-server'], function(cb) {
    return gulp.src('test.js')
        .pipe(jasmine({ verbose: false }));
});

gulp.task('watch', function() {
    gulp.start('run-tests');
    gulp.watch(['test.js','src/**/*.js'], ['run-tests']);
})
```

## Development

```sh
npm install -g gulp
gulp test
```
