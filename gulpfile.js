var //lr = require('tiny-lr'), //Минивебсервер для livereload
    gulp = require('gulp'), //Собственно Gulp JS
	//livereload = require('gulp-livereload'), //Livereload для Gulp
	myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/ - добавляем префиксы
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'), // Склейка файлов
    //connect = require('gulp-connect'), // Webserver
    minifyHTML = require('gulp-minify-html');
    //server = lr();

// Копируем HTML в директорию public
gulp.task('html',function(){
	gulp.src('./assets/**/*.html')
	.pipe(minifyHTML())
	.pipe(gulp.dest('./public'));
	//.pipe(livereload(server));
});

// Собираем CSS
gulp.task('css', function() {
    gulp.src(['./assets/css/**/*.css', '!./assets/css/**/*min.css'])
    .pipe(myth()) // добавляем префиксы - http://www.myth.io/
    .pipe(gulp.dest('./public/css')); // записываем css
    //.pipe(livereload(server)); // даем команду на перезагрузку css
});

// Собираем JS
gulp.task('js', function() {
    gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('main.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
        .pipe(gulp.dest('./public/js'));
        //.pipe(livereload(server)); // даем команду на перезагрузку страницы
});

// Копируем и минимизируем изображения
gulp.task('images', function() {
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'));
});

// Локальный сервер для разработки
/*gulp.task('http-server', function(){
	connect
		.use(connect.static('./public'))
		.listen('3000');
});*/

// Запуск сервера разработки gulp watch
gulp.task('watch', function() {
    // Предварительная сборка проекта
    gulp.run('html','css','images','js');

    /*server.listen(35729, function(err){
        if(err) return console.log(err);*/

        gulp.watch('assets/*', function() {
            gulp.run('html');
        });
        gulp.watch('assets/css/**/*', function() {
            gulp.run('css');
        });
        gulp.watch('assets/img/**/*', function() {
            gulp.run('images');
        });
        gulp.watch('assets/js/**/*', function() {
            gulp.run('js');
        });
    //});

    //gulp.run('http-server');
});


//Сборка проекта
gulp.task('build', function() {

	// html
	gulp.src('./assets/**/*.html')
	.pipe(minifyHTML())
	.pipe(gulp.dest('./build'));

    // css
    gulp.src(['./assets/css/**/*.css', '!./assets/css/**/*min.css'])
    .pipe(myth()) // добавляем префиксы - http://www.myth.io/
    .pipe(csso()) // минимизируем css
    .pipe(gulp.dest('./build/css/')); // записываем css

    // js
    gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));

    // image
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
        
});