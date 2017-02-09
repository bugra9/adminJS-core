var gulp = require('gulp');
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

var testem = require('testem');

var jsFiles = ['./src/*.js', './src/**/*.js'],  
    jsDest = 'dist';

var testFiles = [
    "test/testClass.js",
    "test/constructor.js",
    "test/event.js",
    "test/menu.js",
    "test/data.js",
    "test/type.js",
    "test/list.js",
    "test/edit.js",
    "test/action.js"
  ];

gulp.task('build-src', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('AdminJS.js'))
        .pipe(wrapper(
        	{
				header: 'class AdminJS {',
				footer: '}'
			}
		))
        .pipe(babel({
            presets: ['es2015']
        }))
		.pipe(wrapper({
		header: `/**
 * AdminJS v0.1
 *
 * @link   https://github.com/bugra9/adminJS
 * @author bugra9 https://github.com/bugra9
 * @license MIT
 */
` }))
        .pipe(gulp.dest(jsDest))
		.pipe(rename('AdminJS.min.js'))
        .pipe(uglify())
		.pipe(wrapper({ header: `/**
 * AdminJS v0.1
 *
 * @link   https://github.com/bugra9/adminJS
 * @author bugra9 https://github.com/bugra9
 * @license MIT
 */
`}))
        .pipe(gulp.dest(jsDest));
});

gulp.task('build-test', function() { 
	return gulp.src(testFiles)
		.pipe(concat('test.js'))
		.pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('test-ci', function () {
	var testemOptions = {
		file: 'testem.json',
		skip: 'chromium'
	};

	var t = new testem();
	return t.startCI(testemOptions);
});

gulp.task('build', ['build-src', 'build-test']);
gulp.task('test', ['build', 'test-ci']);

gulp.task('watch', function() {
	gulp.watch(jsFiles, ['build-src']);
	gulp.watch("test/*.js", ['build-test']);
});