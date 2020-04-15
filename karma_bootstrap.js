/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

let dependencies = [];

// List test modules
if (Object.keys(window.__karma__["files"]).length > 0) {
    let TEST_REGEXP = /_(spec|test)\.js$/i
    let normalizedTestModule;
    Object.keys(window.__karma__["files"]).forEach(function (file) {
        if (TEST_REGEXP.test(file)) {
            normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
            dependencies.push(normalizedTestModule)
        }
    });
    if (dependencies.length) {
        dependencies.sort()
        console.debug("Test dependencies: " + JSON.stringify(dependencies));
    } else {
        console.warn("No test were found.");
    }
}


require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/src',

    paths: {
        test: '../test',
        backbone: '../node_modules/backbone/backbone',
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/underscore/underscore',
    },

    // load all dependencies
    deps: dependencies,
    callback: window.__karma__.start
})
