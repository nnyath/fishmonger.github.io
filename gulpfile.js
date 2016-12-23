var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync');


gulp.task('git-copy', function() {
    gulp.src('./_site/**/*.*')
        .pipe(gulp.dest('../fishmonger.github.io'));
});

gulp.task('watch', ['browser-sync'], function () {

    gulp.watch(['./src/**/*.*'], {
        interval: 1000, // default 100
        debounceDelay: 1000, // default 500
        mode: 'poll'
    }, ['jekyll']);
});

gulp.task('browser-sync', ['jekyll'], function () {
    browserSync.init(null, {
        server: {
            baseDir: "../fishmonger.github.io"
        }
    });
});


gulp.task('jekyll', function (gulpCallBack) {
    var spawn = require('child_process').spawn;

    var jekyll = spawn('jekyll', ['build', '--source', './src', '--destination', './_site'], {
        stdio: 'inherit'
    });

    jekyll.on('exit', function (code) {
        gulp.run('git-copy');
        setTimeout(function(){
            browserSync.reload();
        },1000)
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});

gulp.task('default', function () {
    console.log('Work in progress ... run \'gulp watch\' to begin a local dev environment on port 3000');
});
