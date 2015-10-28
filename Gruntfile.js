module.exports = function(grunt) {
    var packageJson = require('./package.json');

    grunt.initConfig({
        basename: packageJson.name,
        version: packageJson.version,
        homepage: packageJson.homepage,
        paths: {
            dest: 'dist',
            src: 'src'
        },
        concat: {
            js: {
                files: [{
                    src: '<%= paths.src %>/*.js',
                    dest: '<%= paths.dest %>/<%= basename %>.js'
                }]
            },
            css: {
                files: [{
                    src: '<%= paths.src %>/*.css',
                    dest: '<%= paths.dest %>/<%= basename %>.css'
                }]
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true,
                    compress: true,
                    banner: "/**\nOpenLayers3 map scale control\nVersion: <%= version %>\nHomepage: <%= homepage %>\n*/\n"
                },
                files: [{
                    src: '<%= paths.dest %>/<%= basename %>.js',
                    dest: '<%= paths.dest %>/<%= basename %>.min.js'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    src: '<%= paths.src %>/<%= basename %>.css',
                    dest: '<%= paths.dest %>/<%= basename %>.min.css'
                }]
            }
        },
        umd: {
            build: {
                options: {
                    src: '<%= paths.dest %>/<%= basename %>.js',
                    dest: '<%= paths.dest %>/<%= basename %>.js',
                    objectToExport: 'MapScale',
                    globalAlias: 'olMapScale',
                    deps: {
                        'default': ['ol']
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-umd');

    grunt.registerTask("default", ['concat', 'umd:build', 'uglify:build', 'cssmin:build']);
};
