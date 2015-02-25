var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  htmlreplace =require('gulp-html-replace'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),
  streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
};