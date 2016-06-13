var gulp = require('gulp');
var browserSync = require('browser-sync');
var runServer = function() {
    return browserSync({
        server: {
            baseDir: './deploy'
        },
        //https: true,
        open: true,
        browser: ['google chrome'],
        files: './deploy/**/*',
        watchOptions: {
            debounceDelay: 2000
        }
    });
};

gulp.task('default', runServer);
