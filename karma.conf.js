// Karma configuration
// Generated on Wed Apr 15 2020 14:37:46 GMT+0200 (Central European Summer Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['requirejs', 'mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            'test-main.js',
            /* Nodejs modules */
            {pattern: 'node_modules/backbone/backbone.js', included: false, watched: false},
            {pattern: 'node_modules/jquery/dist/jquery.js', included: false, watched: false},
            {pattern: 'node_modules/underscore/underscore.js', included: false, watched: false},
            /* Application modules */
            {pattern: 'lib/**/*.js', included: false},
            /* Test modules */
            {pattern: 'test/001_model/PPMModel_test.js', included: false},
            {pattern: 'test/**/*test.js', included: false},
        ],

        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // https://www.npmjs.com/package/karma-firefox-launcher
        // , 'ChromeHeadless', 'FirefoxHeadless'
        // devtools.chrome.enabled
        browsers: ['FirefoxForTesting'],

        customLaunchers: {
            FirefoxForTesting: {
                base: 'Firefox',
                prefs: {
                    'devtools.chrome.enabled': true
                },
            },
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
