const gulp = require("gulp");

const connect = require("gulp-connect");

const sass = require("gulp-sass");

const concat = require('gulp-concat'); 

const uglify = require('gulp-uglify');

const rename = require('gulp-rename');

const cleanCss = require('gulp-clean-css'); 

const imagemin = require('gulp-imagemin'); 

const babel = require("gulp-babel");

gulp.task("copy-index",function(){
	return gulp.src('index.html').pipe(gulp.dest('dist')).pipe(connect.reload());
});

gulp.task("copy-css",function(){
	return gulp.src('css/**').pipe(cleanCss()).pipe(gulp.dest('dist/css')).pipe(connect.reload());
});

gulp.task("copy-js",function(){
	return gulp.src('js/**').pipe(uglify()).pipe(gulp.dest('dist/js')).pipe(connect.reload());
});

gulp.task("copy-img",function(){
	return gulp.src('img/**').pipe(imagemin()).pipe(gulp.dest('dist/img')).pipe(connect.reload());
});

//转换css
gulp.task('sass',function(){
	return gulp.src('sass/**')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
});

gulp.task('subdo',function(){
	return gulp.src('sub/**').pipe(gulp.dest('dist/sub')).pipe(connect.reload());
});




gulp.task("sever",function(){
	connect.server({root:'dist',livereload:true});
});

gulp.task("watch",function(){
	gulp.watch('index.html',['copy-index']);
	gulp.watch('css/*',['copy-css']);
	gulp.watch('js/*.js',['trans']);
	gulp.watch('img/*',['copy-img']);
	gulp.watch('sub/**',['subdo']);
});

//es6-5
gulp.task("trans", function () {  
        return gulp.src("js/*.js")  
          .pipe(babel({"presets":["es2015"]}))  
          .pipe(gulp.dest("dist/js"));  
      }); 

gulp.task('default',['sever','watch']);

