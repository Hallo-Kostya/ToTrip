gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dest",
            index: "main-page.html"
        }
    });
});