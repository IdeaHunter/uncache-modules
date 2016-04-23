'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine');
var gulpIf = require('gulp-if');
var jsonlint = require("gulp-jsonlint");

var config = {
    allJs: [
        '*.js',
        'fixtures/**/*.js'
    ],
    allJson: [
        '**/*.jsonlint'
    ],
    test: 'test.js'
}

function isFixed(file) {
    return file.eslint && typeof file.eslint.output === 'string';
}

gulp.task('jslint', function() {
    return gulp.src(config.allJs)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('lint-fix', function() {
    return gulp.src(config.allJs)
        .pipe(eslint({ fix: true }))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest('./')));
});

gulp.task('jasmine', function() {
    return gulp.src(config.test)
        .pipe(jasmine({ verbose: false }));
});

gulp.task('jsonlint', function() {
    return gulp.src("./src/*.json")
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
})

gulp.task('test', ['jslint', 'jsonlint', 'jasmine']);
