var gulp = require('gulp');
var react = require('gulp-react');
var rimraf = require('gulp-rimraf');

gulp.task('clean', function () {
  return gulp.src(['lib'], {read: false})
    .pipe(rimraf());
});

gulp.task('jsx', ['clean'], function () {
  return gulp.src('src/**/*.jsx')
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.jsx', ['jsx']);
});
