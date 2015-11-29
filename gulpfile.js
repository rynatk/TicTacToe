var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    sync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var ghPages = require('gulp-gh-pages');

gulp.task('js', function() {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('jade', function() {
  gulp.src('./src/**/*.jade')
   .pipe(jade())
   .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', function() {
  gulp.src('./src/styles/**/*.sass')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(sync.stream());
});

gulp.task('serve', ['sass', 'jade'], function() {
  sync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch('./src/styles/**/*.sass', ['sass']);
  gulp.watch('./src/scripts/**/*.js', ['js']);
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch('./dist/**/*.html').on('change', sync.reload);
  gulp.watch('./dist/**/*.js').on('change', sync.reload);
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['serve']);
