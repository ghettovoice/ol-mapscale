module.exports = function(grunt) {
    grunt.initConfig({
        paths: {
            dest: 'dist'
        },
        uglify: {
            options: {
                mangle: true,
                compress: true
            },
            build: {
                files: [{
                    expand: true,
                    src: ['**/*.js'],
                    dest: '<%= paths.dest %>',
                    cwd: 'src'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    src: ['**/*.css'],
                    dest: '<%= paths.dest %>',
                    cwd: 'src'
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    grunt.registerTask("default", ["uglify:build", "cssmin:build"]);
};
