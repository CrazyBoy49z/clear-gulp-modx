var gulp = require('gulp');
var gutil = require('gulp-util');
var pug  = require('gulp-pug');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var tinypng = require('gulp-tinypng');
var concat = require('gulp-concat');

var projPath = 'd:/temp/';


gulp.task('copy-assets', () => {
    // font-awesome
    gulp.src('bower_components/font-awesome/fonts/*.*')
        .pipe(gulp.dest(projPath + 'assets/fonts/font-awesome/fonts/'));
    gulp.src('bower_components/font-awesome/css/font-awesome.css')
        .pipe(gulp.dest(projPath + 'assets/fonts/font-awesome/css/'));

    // slickjs
    gulp.src('bower_components/slick-carousel/slick/fonts/*.*')
        .pipe(gulp.dest(projPath + 'assets/js/slick/fonts/'));
    gulp.src([
        'bower_components/slick-carousel/slick/ajax-loader.gif',
        'bower_components/slick-carousel/slick/slick-theme.css',
        'bower_components/slick-carousel/slick/slick.css',
        'bower_components/slick-carousel/slick/slick.min.js'])
        .pipe(gulp.dest(projPath + 'assets/js/slick/'));

    // jquery colorbox
    gulp.src('bower_components/jquery-colorbox/**/*.*')
        .pipe(gulp.dest(projPath + 'assets/js/colorbox/'));

    // all js
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/html5shiv/dist/html5shiv.min.js'
    ])
        .pipe(gulp.dest('web/js/'));
});

gulp.task('scripts', () => {
    return gulp.src('web/js/*.js')
        .pipe(concat('scripts.js'))
        .on('error', gutil.log)
        //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest(projPath + 'assets/js/'));
});

gulp.task('pug', () => {
    gulp.src('web/index.pug')
        .pipe(pug({pretty: false}))
        .on('error', gutil.log)
        .pipe(gulp.dest(projPath));
});

gulp.task('pug-chunks', () => {
    gulp.src('web/**/*.pug')
        .pipe(pug({pretty: false}))
        .on('error', gutil.log)
        .pipe(gulp.dest(projPath));
});

gulp.task('stylus', () => {
    gulp.src('web/style.styl')
        .pipe(stylus({compress: false}))
        .on('error', gutil.log)
        .pipe(gulp.dest(projPath+'assets/tpl/'));
});

// Pictures for content site
gulp.task('tinypng', () => {
//    gulp.src('web/images/**/*.png')
//        .pipe(tinypng(''))
//        .pipe(gulp.dest(projPath+'assets/img/'));
});

// Pictures for template
// https://github.com/creativeaura/gulp-tinypng
gulp.task('tinypng-tpl', () => {
//    gulp.src('web/img-tpl/**/*.png')
//        .pipe(tinypng(''))
//        .pipe(gulp.dest(projPath+'assets/tpl/img/'));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: projPath
        }
    });
    gulp.watch(projPath + 'index.html').on('change', browserSync.reload);
    gulp.watch(projPath + 'assets/tpl/style.css').on('change', browserSync.reload);
});

gulp.task('watch', () => {
    gulp.watch('web/index.pug', ['pug']);
    gulp.watch('web/html/**/*.pug', ['pug-chunks']);
    gulp.watch('web/js/*.js', ['scripts']);
    gulp.watch('web/style.styl', ['stylus']);
    gulp.watch('web/js/*.js',['scripts']);
});

gulp.task('default', ['copy-assets', 'scripts', 'pug', 'pug-chunks', 'stylus', 'tinypng', 'watch', 'browser-sync']);
