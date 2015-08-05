/*jslint node:true, grunt: true */

module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.initConfig({
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['Chrome'],
                    files: [
                        '../client/components/angular/angular.js',
                        '../client/components/angular-route/angular-route.js',
                        '../client/components/angular-mocks/angular-mocks.js',
                        '../client/js/*.js'
                    ]
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', '../client/js/*.js']
        },
        protractor: {
            options: {
                configFile: "protractor.js",
                keepAlive: true,
                noColor: false,
                args: {}
            },
            your_target: {
                all: {}
            }
        }
    });

    grunt.registerTask("test", ['karma', 'jshint:all']);

};
