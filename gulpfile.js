var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем pug-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем pug-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
    uncss        = require('gulp-uncss');
    pug          = require('gulp-pug');
    htmlbeautify = require('gulp-html-beautify');
    notify = require("gulp-notify");
    plumber = require('gulp-plumber');


gulp.src('app/*.ext')
    .pipe(plumber())
    .pipe(gulp.dest('./dist'));
gulp.src("app/test.ext")
    .pipe(notify("Found file: <%= file.relative %>!"));

gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством pug-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('htmlbeautify', function() {
    var options = {
    indentSize: 2,
        unformatted: [
            // https://www.w3.org/TR/html5/dom.html#phrasing-content
            'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
            'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
            'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
            'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
            'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
        ]
};
    gulp.src('./*.html')
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest('app'))
});

gulp.task('pug', function() {
    return gulp.src("app/pug/pages/*.pug")
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("app"))
        .pipe(htmlbeautify())
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.js', // Берем JQuery
        'app/libs/slick-carousel/slick/slick.min.js', // Берем Slick
        'app/libs/wow/dist/wow.min.js' // Берем WOW
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/slick-carousel/slick/slick.css', // Берем Slick
        'app/libs/wow/css/libs/animate.css' // Берем WOW
    ])
        .pipe(concat('libs.css')) // Собираем их в кучу в новом файле libs.min.css
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('clean', async function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
            // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))/**/)
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css'
    ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('uncss', function () {
    return gulp.src('app/css/main.css')
        .pipe(uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com']
        }))
        .pipe(gulp.dest('./out'));
});

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', gulp.parallel('css-libs', 'pug', 'sass', 'scripts', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));