var gulp = require('gulp'),
	jshint = require('gulp-jshint')
	uglify = require('gulp-uglify')
	rename = require('gulp-rename')
	concat = require('gulp-concat')
	del = require('del')
	autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	});
});

gulp.task('styles', function() {
	return gulp.src('src/css/**/*.css')
	.pipe(autoprefixer('last 4 version'))
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'));
});

gulp.task('clean', function() {
	return del(['assets/js', 'assets/css']);
})

gulp.task('hi', function() {
	console.log('hi there');
});

gulp.task('default', ['clean', 'styles', 'scripts']);

gulp.task('watch', ['clean', 'styles', 'scripts', 'browserSync'], function() {
	gulp.watch('src/css/**/*.css', ['styles']);
	gulp.watch('src/js/**/*.js', ['scripts']);
});