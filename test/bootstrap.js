/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

// Make sure to require the requirejs module for nodejs
if (typeof requirejs !== 'function') {
    const requirejs = define = require('requirejs');

    requirejs.config({
        baseUrl: "lib/ppm_bridge",
        paths: {},
        shim: {},
        deps: []
    });
}

// Mocha
const Mocha = require("mocha");
const describe = Mocha.describe;
const it = Mocha.it;
