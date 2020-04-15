/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['backbone'], function (Backbone) {
    /*
    Backbone.$.ajaxSetup({
        headers: {'Authorization' :'Basic USERNAME:PASSWORD'}
    });

    const _sync = Backbone.sync
    Backbone.sync = function (method, model, options) {

        options.host = "http://localhost:9999/ppm"

        console.log("Backbone sync method: " + method);
        console.log("Backbone sync model: " + JSON.stringify(model));
        console.log("Backbone sync options: " + JSON.stringify(options));

        _sync.call( this, method, model, options )
    };
    */

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

    return PPMModel;
});
