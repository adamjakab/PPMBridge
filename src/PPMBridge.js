/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define([], function () {
    /**
     * Constructs a new PPMBridge instance with `options`.
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

    return PPMBridge;
});
