/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

let dependencies = [];

// Inject the main application
// dependencies.push("PPMBridge")

// List test modules
if (Object.keys(window.__karma__["files"]).length > 0) {
    let TEST_REGEXP = /_(spec|test)\.js$/i
    let normalizedTestModule;
    let karma_files = Object.keys(window.__karma__["files"])
    karma_files.sort()
    karma_files.forEach(function (file) {
        if (TEST_REGEXP.test(file)) {
            normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
            dependencies.push(normalizedTestModule)
        }
    });
}

// console.debug("Dependencies: " + JSON.stringify(dependencies));

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/src',

    paths: {
        test: '../test',
        backbone: '../node_modules/backbone/backbone',
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/underscore/underscore',
        bluebird: '../node_modules/bluebird/js/browser/bluebird',
    },

    // load all dependencies
    deps: dependencies,

    // start the show
    callback: function () {
        window.__karma__.start()
    }

})

let ppm_bridge_options = {
    username: "tester",
    password: "test-123"
};

require(['jquery', 'PPMBridge'], function ($, PPMBridge) {
    console.log("Ready...")
    $(document).ready(function () {
        PPMBridge.setOptions(ppm_bridge_options)
        //ppm_bridge = new PPMBridge.PPMBridge(ppm_bridge_options);
        //window.__karma__.start.apply(this, arguments)
    });
});