const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
	return gulp.src('static/scss/*')
		.pipe(sass())
		.pipe(gulp.dest('static/css'))
});
gulp.task('watch', () => {
	gulp.watch(['static/scss/*.scss'], gulp.series(['sass']));
});
