var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  notify = require('gulp-notify'),
  concat = require('gulp-concat'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  cssmin = require('gulp-cssmin'),
  livereload = require('gulp-livereload');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  JS_DEST: 'dist/js',
  CSS_DEST: 'dist/css',
  ENTRY_POINT: './src/app.jsx'
};

var browserifyTask = function(options) {
  var appBundler = browserify({
    entries: [options.src],
    transform: [reactify],
    debug: options.development,
    cache: {}, packageCache: {}, fullPaths: true
  });

  var rebundle = function() {
    var start = Date.now();
    console.log('Building app bundle');

    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload()))
      .pipe(notify(function() {
        console.log('App bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  if(options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }

  rebundle();
};

var sassTask = function(options) {
  var run = function() {
    var start = Date.now();
    console.log('Building Sass bundle');

    gulp.src(options.src)
      .on('error', gutil.log)
      .pipe(sass())
      .pipe(gulp.dest(options.dest))
      .pipe(cssmin())
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function() {
        console.log('Sass bundle built in ' + (Date.now() - start) + 'ms');
      }));
  }

  run();

  if(options.development) {
    gulp.watch(options.src, run);
  }
}

gulp.task('default', function() {
  browserifyTask({
    development: true,
    src: './src/app.jsx',
    dest: './dist/js'
  });

  sassTask({
    development: true,
    src: './src/sass/main.scss',
    dest: './dist/css'
  });
});

gulp.task('deploy', function() {
  browserifyTask({
    development: false,
    src: './src/app.jsx',
    dest: './dist/js'
  });

  sassTask({
    development: false,
    src: './src/sass/main.scss',
    dest: './dist/css'
  });
});