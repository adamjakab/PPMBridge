// Karma configuration
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        //frameworks: ['requirejs', 'mocha', 'chai'],
        frameworks: ['requirejs', 'jasmine'],


        // list of files / patterns to load in the browser
        files: [
            /* Nodejs modules */
            {pattern: 'node_modules/backbone/backbone.js', included: false, watched: false},
            {pattern: 'node_modules/jquery/dist/jquery.js', included: false, watched: false},
            {pattern: 'node_modules/underscore/underscore.js', included: false, watched: false},
            {pattern: 'node_modules/bluebird/js/browser/bluebird.js', included: false, watched: false},
            /* Application modules */
            {pattern: 'src/**/*.js', included: false},
            /* Test modules */
            {pattern: 'test/test_helper.js', included: false},
            // {pattern: 'test/001_unit/**/*_test.js', included: false},
            {pattern: 'test/002_functional/**/*_test.js', included: false},
            /* Karma bootstrap */
            'karma_bootstrap.js',
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

        // proxies
        proxies: {
            '/ppm': {
                'target': 'http://jakabimac.local:9999/ppm',
                'changeOrigin': true
            }
        },

        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        restartOnFileChange: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // https://www.npmjs.com/package/karma-firefox-launcher
        // , 'ChromeHeadless', 'FirefoxHeadless'
        // devtools.chrome.enabled
        browsers: ['FirefoxForTesting'],

        customLaunchers: {
            FirefoxForTesting: {
                base: 'Firefox',
            },
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // How long will Karma wait for a message from a browser before disconnecting from it (in ms).
        browserNoActivityTimeout: 30 * 60 * 1000,


        client: {
            // runInParent: true,
            //clearContext: false,
            mocha: {
                // change Karma's debug.html to the mocha web reporter
                reporter: 'html',

                // Run only tests matching the pattern
                // grep: '<pattern>', // passed directly to mocha

                //timeout for single test
                timeout: 5000,
            },
            jasmine: {
                timeoutInterval: 5000,
                random: false,

            }
        },

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}

