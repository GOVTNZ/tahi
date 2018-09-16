(function (gulp, gulpLoadPlugins) {

    'use strict';

    // gulp watch --compressed - for compressed assets in dev build
    var argv = require('yargs').argv;

    var fs = require('fs-extra');

    var $ = gulpLoadPlugins({
            pattern: ['gulp*', 'autoprefixer', 'del', 'run-sequence'],
            lazy: true,
        }),
        _ = {
            vendor: 'node_modules',
            config: 'config',
            src: 'src',
            tmp: 'tmp',
            devBuild: 'build',
        };

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ json/js error reporter
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    var map = require('map-stream');
    var exitOnJshintError = map(function (file, cb) {
        if (file.jshint.success) {
            return cb(null, file);
        }

        file.jshint.results.forEach(function (result) {
            if (!result.error) {
                return;
            }

            $.util.log($.util.colors.red('x jshint-strict:'), result.error.reason);
            process.exit(1);
        });

        cb(null, file);
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ jsonlint
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('jsonlint', function () {
        return gulp.src([
            'package.json',
            '.jshintrc',
            '.jscs.json',
        ])
        .pipe($.cached('jsonlint', { optimizeMemory: true }))
        .pipe($.plumber())
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter())
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ jsonlint:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });

    gulp.task('jsonlint-strict', function () {
        return gulp.src([
            'package.json',
            '.jshintrc',
            '.jscs.json',
        ])
        .pipe($.cached('jsonlint-strict', { optimizeMemory: true }))
        .pipe($.plumber())
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter())
        .pipe($.jsonlint.failAfterError())
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ jsonlint-strict:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ jshint
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('jshint', function () {
        return gulp.src([
            'gulpfile.js',
            _.src + '/js/**/*.js',
            '!' + _.vendor + '/**/*.js',
            '!' + _.src + '/js/temp/**/*.js',
        ])
        .pipe($.cached('jshint', { optimizeMemory: true }))
        .pipe($.plumber())
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ jshint:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });

    gulp.task('jshint-strict', function () {
        return gulp.src([
            'gulpfile.js',
            _.src + '/js/**/*.js',
            '!' + _.vendor + '/**/*.js',
            '!' + _.src + '/js/temp/**/*.js',
        ])
        .pipe($.cached('jshint-strict', { optimizeMemory: true }))
        .pipe($.plumber())
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe(exitOnJshintError)
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ jshint-strict:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ jscs
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('jscs', function () {
        return gulp.src([
            'gulpfile.js',
            _.src + '/js/**/*.js',
            '!' + _.src + '/js/temp/**/*.js',

            // '!' + _.vendor + '/**/*.js',
        ])
        .pipe($.cached('jscs', { optimizeMemory: true }))
        .pipe($.plumber())
        .pipe($.jscs({
            configPath: '.jscsrc',
        }))
        .pipe($.jscs.reporter())
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ jscs:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });

    gulp.task('jscs-strict', function () {
        return gulp.src([
            'gulpfile.js',
            _.src + '/js/**/*.js',
            '!' + _.src + '/js/temp/**/*.js',

            // '!' + _.vendor + '/**/*.js',
        ])
        .pipe($.cached('jscs-strict', { optimizeMemory: true }))
        .pipe($.plumber())
        .pipe($.jscs({
            configPath: '.jscsrc',
        }))
        .pipe($.jscs.reporter())
        .pipe($.jscs.reporter('fail'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ jscs-strict:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ SCSS lint
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('scsslint', function () {
        return gulp.src(
            _.src + '/**/*.scss'
        )
        .pipe($.plumber())
        .pipe($.stylelint({
            reporters: [
                {
                    formatter: 'string',
                    console: true,
                },
            ],
        }))
        .pipe(gulp.dest(_.src))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ scsslint:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    gulp.task('scsslint-strict', function () {
        return gulp.src(
            _.src + '/**/*.scss'
        )
        .pipe($.plumber())
        .pipe($.stylelint({
            reporters: [
                {
                    formatter: 'string',
                    console: true,
                    failAfterError: true,
                },
            ],
        }))
        .pipe(gulp.dest(_.src))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ scsslint:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ js - predom
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('modernizr', function () {
        return gulp.src(
            _.src + '/js/*.js'
        )
        .pipe($.modernizr({
            options: [
                'html5shiv',

                // Other moderizr features can go here
            ],
        }))
        .pipe($.gulp.dest(_.tmp + '/js/'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ modernizr:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    // Add additional predom vendor js modules here in order of inheritance

    // IE <8 specific polyfills
    // gulp.task('js-predom-polyfills', function () {
    //     return gulp.src([
    //         // Add addional third party plugins here
    //         _.vendor + '/respond.js/src/respond.js',
    //         _.vendor + '/selectivizr/selectivizr.js',
    //         _.vendor + '/rem-unit-polyfill/js/rem.js'
    //     ])
    //     .pipe($.plumber())
    //     .pipe($.concat('lib-ie-predom.js'))
    //     .pipe($.if(!argv.compressed, $.size(), $.uglify()))
    //     .pipe($.gulp.dest(_.build + '/js'))
    //     .pipe($.size())
    //     .on('data', function (file)  { $.util.log($.util.colors.green('✓ js-predom-polyfills:'), file.relative); })
    //     .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    // });


    gulp.task('js-predom', ['modernizr'], function () {
        return gulp.src([

            // Add additional third party plugins here
            _.tmp + '/js/modernizr.js',

            // _.src + '/js/init-predom.js'
        ])
        .pipe($.plumber())
        .pipe($.concat('predom.js'))
        .pipe($.if(!argv.compressed, $.size(), $.uglify()))
        .pipe($.gulp.dest(_.devBuild + '/js'))
        .pipe($.size())
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ js-predom:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });

    gulp.task('js-predom-build', ['modernizr'], function () {
        return gulp.src([

            // Add additional third party plugins here
            _.tmp + '/js/modernizr.js',

            // _.src + '/js/init-predom.js'
        ])
        .pipe($.plumber())
        .pipe($.concat('predom.js'))
        .pipe($.size())
        .pipe($.uglify())
        .pipe($.gulp.dest(_.devBuild + '/js'))
        .pipe($.size())
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ js-predom:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ js - custom
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    // Add additional custom js modules here in order of inheritance

    var customJS = [

        // Add third party (incl CT) plugins here
        _.vendor + '/jquery/dist/jquery.js',

        // Jquery UI for datepicker
        _.vendor + '/jquery-ui/ui/version.js',
        _.vendor + '/jquery-ui/ui/keycode.js',
        _.vendor + '/jquery-ui/ui/widgets/datepicker.js',
        _.vendor + '/js-cookie/src/js.cookie.js',
        _.vendor + '/picturefill/dist/picturefill.js',
        _.vendor + '/svg4everybody/dist/svg4everybody.legacy.js',
        _.vendor + '/dropkickjs/build/js/dropkick.min.js',
        _.vendor + '/modaal/dist/js/modaal.js',
        _.vendor + '/ua-parser-js/dist/ua-parser.min.js',
        _.vendor + '/fontfaceobserver/fontfaceobserver.js',

        // pub/sub module
        _.src + '/js/events.js',

        // Add Utils here
        _.src + '/js/utils/ct-helpers.js',
        _.src + '/js/utils/ct-smooth-scroll.js',
        _.src + '/js/utils/ct-overflow-helper.js',
        _.src + '/js/utils/ct-element-path.js',
        _.src + '/js/utils/ct-jquery-accessible-hide-show-aria.js',
        _.src + '/js/utils/ct-ss-datepicker.js',

        // Add Components here
        _.src + '/js/components/video.js',
        _.src + '/js/components/table.js',
        _.src + '/js/components/datepicker.js',
        _.src + '/js/components/nav-slicer.js',
        _.src + '/js/components/notification-hide.js',
        _.src + '/js/components/simple-show-hide.js',

        // init
        _.src + '/js/init-custom.js',
    ];

    gulp.task('js-custom', function () {
        return gulp.src(
            customJS
        )
        .pipe($.plumber())
        .pipe($.concat('custom.js'))


        .pipe($.if(!argv.compressed, $.size(), $.uglify()))


        .pipe(gulp.dest(_.devBuild + '/js'))
        .pipe($.size())
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ js-custom:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });

    gulp.task('js-custom-build', function () {
        return gulp.src(
            customJS
        )
        .pipe($.plumber())
        .pipe($.concat('custom.js'))
        .pipe($.size())
        .pipe($.uglify())
        .pipe(gulp.dest(_.devBuild + '/js'))
        .pipe($.size())
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ js-custom-build:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ styles
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    // Compiles SCSS for build and styleguide
    gulp.task('styles', function () {
        return gulp.src([
            _.src + '/scss/main.scss',
            _.src + '/templates/blocks/**/*.scss',
            _.src + '/templates/components/**/*.scss',
            _.src + '/templates/style-patterns/**/*.scss',
        ])
        .pipe($.plumber())
        .pipe($.concat({
            cwd: _.src + '/scss/',
            path: _.src + '/scss/main.scss',
        }))
        .pipe($.if(!argv.compressed, $.sourcemaps.init()))
        .pipe($.sass()
            .on('error', $.sass.logError)
        )
        .pipe($.postcss([
            $.autoprefixer({
                browsers: ['last 5 versions'],
            }),
        ]))
        .pipe($.if(argv.compressed, $.cleanCss()))
        .on('error', $.util.log)
        .pipe($.if(!argv.compressed, $.sourcemaps.write()))
        .pipe(gulp.dest(_.devBuild + '/css'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ styles:'), file.relative); })
        .on('close', function () { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });

    // Only compiles SCSS for build and minifies
    gulp.task('styles-build', function () {
        return gulp.src([
            _.src + '/scss/main.scss',
            _.src + '/templates/blocks/**/*.scss',
            _.src + '/templates/components/**/*.scss',
        ])
        .pipe($.plumber())
        .pipe($.concat({
            cwd: _.src + '/scss/',
            path: _.src + '/scss/main.scss',
        }))
        .pipe($.sass({
            errLogToConsole: true,
        }))
        .pipe($.postcss([
            $.autoprefixer({
                browsers: ['last 5 versions'],
            }),
        ]))
        .pipe($.cleanCss())
        .on('error', $.util.log)
        .pipe(gulp.dest(_.devBuild + '/css'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ styles-build:'), file.relative); })
        .on('close', function () { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    // Print CSS
    gulp.task('print-styles', function () {
        return gulp.src([
            _.src + '/scss/print/*.scss',
        ])
        .pipe($.plumber())
        .pipe($.changed(_.devBuild + '/css'))
        .pipe($.sass({
            errLogToConsole: true,
        }))
        .pipe($.cleanCss())
        .on('error', $.util.log)
        .pipe(gulp.dest(_.devBuild + '/css'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ print-styles:'), file.relative); })
        .on('close', function () { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ copy styleguide requirements
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('copy-components-scss', function () {
        return gulp.src([
            _.src + '/templates/components/**/*',
        ])
        .pipe($.plumber())
        .pipe($.changed(_.devBuild + '/components'))
        .pipe(gulp.dest(_.devBuild + '/components'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ copy-components-scss:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });

    gulp.task('copy-patterns-scss', function () {
        return gulp.src([
            _.src + '/templates/style-patterns/**/*',
        ])
        .pipe($.plumber())
        .pipe($.changed(_.devBuild + '/style-patterns'))
        .pipe(gulp.dest(_.devBuild + '/style-patterns'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ copy-patterns-scss:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });

    gulp.task('copy-styleguide-md', function () {
        return gulp.src([
            _.src + '/templates/*.md',
        ])
        .pipe($.plumber())
        .pipe($.changed(_.devBuild))
        .pipe(gulp.dest(_.devBuild))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ copy-styleguide-md:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ styleguide
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('styleguide', ['copy-patterns-scss', 'copy-styleguide-md'], function () {
        $.run(

            // Specify the location of the config file here
            'kss-node --config kss-config.json'
        ).exec()
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ styleguide:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ svg
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('svg-sprite', function () {
        return gulp.src([
            _.src + '/img/icons/*.svg',
        ])
        .pipe($.plumber())
        .pipe($.svgSprite({
            mode: {
                symbol: { // symbol mode to build the SVG
                    dest: 'icons', // destination folder
                    sprite: 'svg-sprite.svg', //sprite name
                },
            },
            svg: {
                xmlDeclaration: false, // strip out the XML attribute
                doctypeDeclaration: false, // don't include the !DOCTYPE declaration
            },
        }))
        .pipe(gulp.dest(_.devBuild + '/img'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ svg-sprite:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });

    });


    gulp.task('svg', ['svg-sprite'], function () {
        return gulp.src([
            _.src + '/img/icons/*.svg',
        ])
        .pipe($.plumber())
        .pipe($.svgmin([{ removeDoctype: false }, { removeComments: false }]))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ svg:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });

    });



    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ img
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('img-build', ['svg'], function () {
        return gulp.src([
            _.src + '/img/**/*.{png,jpg,jpeg,gif,ico,svg}',
        ])
        .pipe($.plumber())
        .pipe($.changed(_.devBuild + '/img'))
        .pipe(
            $.imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true,
            })
        )
        .pipe(gulp.dest(_.devBuild + '/img'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ img:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });



    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ copy fonts
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('copy-fonts', function () {
        return gulp.src([
            _.src + '/font/**/*',
        ])
        .pipe($.plumber())
        .pipe($.changed(_.devBuild + '/font'))
        .pipe(gulp.dest(_.devBuild + '/font'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ copy-fonts:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });



    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ Nunjucks html templating
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('nunjucks', ['copy-components-scss'], function () {
        return gulp.src([
            _.src + '/templates/**/*.html',
            '!' + _.src + '/templates/macros/**/*.html',
            '!' + _.src + '/templates/page.html',
        ])
        .pipe($.nunjucksHtml({
            searchPaths: [_.src + '/templates'],
        }))

        // .pipe($.inlineSource())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(_.devBuild))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ nunjucks:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });
    });


    gulp.task('html-prettify', function () {
        return gulp.src([
            _.devBuild + '/components/**/*.html',
        ])
        .pipe($.changed(_.devBuild + '/components'))
        .pipe($.htmlPrettify({ indent_char: ' ', indent_size: 4 })) // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        .pipe(gulp.dest(_.devBuild + '/components'))
        .on('data', function (file)  { $.util.log($.util.colors.green('✓ nunjucks:'), file.relative); })
        .on('close', function ()     { $.util.log($.util.colors.green('✓ Done @'), $.util.colors.green(new Date()), '\n'); });

    });



    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ Tests
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('lint', function (callback) {
        $.runSequence([
            'scsslint',
            'jsonlint',
            'jshint',
            'jscs',
        ], callback);
    });

    gulp.task('lint-strict', function (callback) {
        $.runSequence([
            'scsslint-strict',
            'jsonlint-strict',
            'jshint-strict',
            'jscs-strict',
        ], callback);
    });



    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ watch
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('watch', ['lint'], function () {

        // Watch style files
        $.watch([_.src + '/scss/**/*.scss'], function () {
            gulp.start('styles');
            gulp.start('print-styles');
        });

        $.watch([_.src + '/templates/**/*.scss'], function () {
            gulp.start('styles');
        });

        $.watch([_.src + '/**/*.json'], function () {
            gulp.start('styleguide');
        });

        // Watch script files
        $.watch([_.src + '/js/**/*', _.vendor + '/**/*.js'], function () {
            gulp.start('js-custom');
            gulp.start('js-predom');
        });

        // Watch image files
        $.watch([_.src + '/img/*/**'], function () {
            gulp.start('img-build');
        });

        // Watch font files
        $.watch([_.src + '/font/*'], function () {
            gulp.start('copy-fonts');
        });

        // Watch html templates
        $.watch([_.src + '/templates/**/*.html'], function () {
            gulp.start('nunjucks');
        });
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ clean
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('clean', function (cb) {
        $.del([
            _.tmp,
            _.devBuild,
        ], cb);
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ main build task
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('build', function (callback) {
        $.runSequence('lint-strict', [
            'nunjucks',
            'styles-build',
            'print-styles',
            'js-custom-build',
            'js-predom-build',
            'img-build',
            'copy-fonts',
        ], callback);
    });


    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ default
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    gulp.task('default', ['build']);


}(require('gulp'), require('gulp-load-plugins')));
