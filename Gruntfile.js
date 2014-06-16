module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: ['*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: [
                    'test.js'
                ]
            }
        }
    });

    // Load the plugin(s)
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'mochaTest']);
};