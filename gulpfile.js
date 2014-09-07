var gulp = require('gulp'),
   gutil = require('gulp-util'),
   uglify = require('gulp-uglify'),
   concat = require('gulp-concat'),
   sass = require('gulp-sass'),
   clean = require('gulp-clean');

// File paths
var paths = {
   scripts: [],
   scss: ['./bower_components/foundation/scss/*.scss'],
   images: [],
   css: 'build/css',
   html: './*.html'
};

gulp.task('clean', function () {
   gulp.src(paths.css, {read: false})
      .pipe(clean())
});

gulp.task('js', function () {
   gulp.src('./js*.js')
      .pipe(uglify())
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./js'))
});

gulp.task('sass', function () {
   var options = {sourceMap: 'map'};
   gulp.src(paths.scss)
      .pipe(sass(options))
      .pipe(gulp.dest(paths.css))
});

gulp.task('watch', function () {
   gulp.watch(paths.scss, ['sass']);
});

gulp.task('default', ['clean', 'sass', 'watch']);