/*
    Copyright (C) 2020  Soheil Khodayari, CISPA
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    Description:
    ------------
    GULP file to compile SCSS styles into CSS


    Running:
    ------------
    > npm run scss to compile the themes

*/




var gulp = require('gulp');
var sass = require('gulp-sass');
const del = require('del');

sass.compiler = require('node-sass');
 
gulp.task('clean', () => {
	return del([
	    './assets/css/theme-1.css',
	]);
});

gulp.task('sass', function () {
  return gulp.src('./assets/scss/theme-1.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'));
});
 

gulp.task('default', gulp.series(['clean', 'sass']));

gulp.task('sass:watch', function () {
  gulp.watch('./assets/scss/**/*.scss', (done)=> {
  	gulp.series(['clean', 'sass'])(done);
  });
});

