'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('karma', [], function () {

  var injectStyles = gulp.src([
    paths.tmp + '/serve/app/**/*.css',
    '!' + paths.tmp + '/serve/app/vendor.css'
  ], { read: false });

  var injectScripts = gulp.src([
    paths.src + '/app/**/*.js',
    '!' + paths.src + '/app/**/*.spec.js',
    '!' + paths.src + '/app/**/*.mock.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    addRootSlash: false,
    starttag: 'additionalFiles = [',
    endtag: ']',
    transform: transformFiles
  };

  function  transformFiles(filepath, file, i, length)
  {
    return '"src/' + filepath + '"' + (i + 1 < length ? ',' : '');
  }


  return gulp.src('./karma.conf.js')
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(gulp.dest('./'));





});
