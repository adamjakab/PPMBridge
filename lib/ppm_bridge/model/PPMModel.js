/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['backbone'], function (Backbone) {
    Backbone.sync = function (method, model) {
        console.log("Backbone sync: " + method + ": " + JSON.stringify(model));
        model.set('id', 1);
    };

    class PPMModel extends Backbone.Model {
        defaults = {};

        constructor() {
            super();
            Backbone.Model.apply(this, arguments);
        }

        validate(attrs, options) {
            return null;
        }
    }

    /**
     * Export for Node
     */
    if (typeof exports !== 'undefined') {
        exports.PPMModel = PPMModel;
    }

    return PPMModel;
});
