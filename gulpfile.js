const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const gulpStylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
// const babel = require('gulp-babel');
const rigger = require('gulp-rigger');
const imagemin = require('gulp-imagemin');
const server = require('browser-sync').create();
const del = require('del');
const csscomb = require('gulp-csscomb');

function styles() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(plumber())
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                {
                    formatter: 'string',
                    console: true,
                },
            ],
        }))
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(csscomb())
        .pipe(gulp.dest('build/css'));
}

function scripts(cb) {
    gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(eslint())
        // .pipe(babel())
        .pipe(eslint.format())
        .pipe(rigger())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/js'));
    return cb();
}

function imageMinify(cb) {
    gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
    return cb();
};

function fonts() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('build/fonts'));
}

function htmlMain() {
    return gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
}

function htmlComponents() {
    return gulp.src('src/components/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/components'));
}

function libs() {
    return gulp.src('src/assets/libs/**/*')
        .pipe(gulp.dest('build/libs'));
}

function readyReload(cb) {
    server.reload();
    cb();
}

function watch(cb) {
    server.init({
        server: './build',
        notify: false,
        open: true,
        cors: true,
    });

    gulp.watch('./src/styles/**/*.scss', gulp.series(styles, cb => gulp.src('build/css').pipe(server.stream()).on('end', cb)));
    gulp.watch('./src/js/**/*.js', gulp.series(scripts, readyReload));
    gulp.watch('./src/**/*.html', gulp.series(htmlMain, htmlComponents, readyReload));
}

function clean() {
    return del(['build/*']);
}


const dev = gulp.parallel(htmlMain, htmlComponents, styles, scripts, fonts, imageMinify, libs);
const build = gulp.series(clean, dev);

gulp.task('dev', gulp.series(clean, dev, watch));
gulp.task('build', build);