'use strict';

var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var csso = require('gulp-csso');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var runSequence = require("run-sequence");

gulp.task("clean", (done) => {
    return del(["dist"], done);
});

gulp.task("copy-fonts", () => {
    return gulp.src("./fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("copy-icons", () => {
    return gulp.src("./images/icons/*")
    .pipe(gulp.dest("dist/images/icons"));
});

gulp.task("copy-obras", () => {
    return gulp.src("./images/obras/*.jpg")
    .pipe(gulp.dest("dist/images/obras"));
});

gulp.task("copy-produtos", () => {
    return gulp.src("./images/produtos/*")
    .pipe(gulp.dest("dist/images/produtos"));
});

gulp.task("copy-slider", () => {
    return gulp.src("./images/slider/*.jpg")
    .pipe(gulp.dest("dist/images/slider"));
});

gulp.task("copy-logo", () => {
    return gulp.src("./images/*.jpg")
    .pipe(gulp.dest("dist/images"));
});

gulp.task("minify-js", function (cb) {
    pump([
          gulp.src("js/*.js"),
          uglify(),
          gulp.dest("dist/js")
      ],
      cb
    );
});

gulp.task('inline-css-minify-html', function () {
    var sources =  gulp.src(['css/*.css'])
        .pipe(replace('../', ''))
        .pipe(csso());

    return gulp.src('*.html')
        .pipe(inject(sources, {
            starttag: '<!-- inject:head:css -->',
            transform: function (filePath, file) {
                return '<style>' +  file.contents.toString('utf8') + '</style>'
      }
  }))
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task("default", (done) => {
    runSequence("clean", 
    ["copy-fonts"
    ,"copy-icons"
    ,"copy-obras"
    ,"copy-produtos"
    ,"copy-slider"
    ,"copy-logo"
    ,"minify-js"
    ,"inline-css-minify-html"]);
 });