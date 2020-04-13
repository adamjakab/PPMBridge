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

let config = require('./ppm_bridge/config');
let PPMModel = require("./ppm_bridge/model/PPMModel")
let PassCard = require("./ppm_bridge/model/PassCard")

exports = module.exports = PPMBridge;

/*!
 * PPMBridge version
 */
exports.version = '0.0.1';

/*!
 * Configuration
 */
exports.config = config;


/*!
 * Expose internals.
 */

/**
 * @public
 * @class PPMModel
 * @memberof PPMBridge
 */
exports.PPMModel = PPMModel;

/**
 * @public
 * @class PassCard
 * @memberof PPMBridge
 */
exports.PassCard = PassCard;


/**
 * Constructs a new Mocha instance with `options`.
 *
 * @public
 * @class PPMBridge
 * @param {Object} [options] - Settings object.
 */
function PPMBridge(options) {
    this.options = options;
}

/**
 * Returns a greeting with your `name`.
 *
 * @public
 * @param {string} [name=""] - Your name.
 * @returns {string}
 * @chainable
 */
PPMBridge.prototype.greet = function (name) {
    return "Hi " + name;
};
