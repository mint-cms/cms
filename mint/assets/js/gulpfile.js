var browserify = require('browserify'),
    uglify     = require('uglify-js'),
    gulp       = require('gulp'),
    fs         = require('fs');

var source = './index.js',
    dist   = './mint.js';

var bro = function () {
    return browserify(source, {
        standalone: 'mint'
    });
};

/**
 * Bundle and compress likely to dist/likely.js
 */
gulp.task('build', function () {
    return bro().bundle(function (e, buffer) {
        var result = uglify.minify(buffer.toString(), {
            fromString: true
        });
        
        fs.writeFileSync(dist, result.code);
    });
});

gulp.task('default', function () {
    return bro().bundle(function (e, buffer) {
        fs.writeFileSync(dist, buffer);
    });
});

gulp.task('watch', function () {
    
});