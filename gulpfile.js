var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref      = require('gulp-useref');
var gulpIf      = require('gulp-if');
var cssnano     = require('gulp-cssnano');
var imagemin    = require('gulp-imagemin');
var cache       = require('gulp-cache');
var del         = require('del');
var runSequence = require('run-sequence');

// var uglify   = require('gulp-uglify');


gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
})

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))

    // .pipe(gulpIf('*.js', uglify())) // Minifies only if it's a JavaScript file
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/images'))
})

gulp.task('fonts', function(){
    return gulp.src('app/fonts')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function(){
    return del.sync('dist');
})

// Run
gulp.task('watch', gulp.series('browserSync', 'sass', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
}));
gulp.task('build', gulp.series(function() {
    runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'],callback)
}));
gulp.task('default', gulp.series(function() {
    runSequence(['sass', 'browserSync', 'watch'], callback)
}));

