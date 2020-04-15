/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'backbone'], function (_, Backbone) {
    const _BB_sync = Backbone.sync;
    const _BB_ajax = Backbone.ajax;

    /**
     * https://backbonejs.org/#Sync
     *
     * @param {string} method  The CRUD method ("create", "read", "update", or "delete")
     * @param {Backbone.Model|Backbone.Collection} model
     * @param {{}} options  Success and error callbacks, and all other jQuery request options
     * @returns {*}
     */
    Backbone.sync = function (method, model, options) {

        _.extend(options, {
            data: {
                db_request: {
                    operation: "get_card",
                    id: model.get("id")
                }
            },
        });

        console.debug("Backbone sync method: " + method);
        console.debug("Backbone sync model: " + JSON.stringify(model));
        console.debug("Backbone sync options: " + JSON.stringify(options));

        _BB_sync.call(this, method, model, options)
    };


    /**
     * @param {XMLHttpRequest} xhr
     */
    Backbone.ajax = function (xhr) {
        let data = {
            user: 'jack',
            service: "db",
        };
        _.extend(data, xhr.data);
        let raw_data = JSON.stringify(data);

        _.extend(xhr, {
            url: "/ppm",
            method: "POST",
            cache: false,
            contentType: "application/json",
            dataType: "json",
            data: raw_data,
        });

        xhr.complete = function (xhr, status) {
            console.debug("COMPLETE: " + status);
        };

        console.debug("Backbone request(" + xhr.url + "): " + raw_data);
        _BB_ajax.call(this, xhr)
    };

    class PPMModel extends Backbone.Model {
        defaults = {};

        constructor() {
            super();
            Backbone.Model.apply(this, arguments);
        }

        parse(data, options) {
            //console.debug("Model PARSE RAW DATA: " + JSON.stringify(data))

            let db_data = {}
            if (_.has(data, "db_response")) {
                if (_.has(data["db_response"], "response")) {
                    let db_response = data["db_response"]["response"];
                    if (_.has(db_response, "data")) {
                        if (_.isArray(db_response["data"])) {
                            if (db_response["data"].length === 1) {
                                db_data = db_response["data"].pop()
                            }
                        }
                    }
                }
            }
            console.debug("MODEL PARSED DATA: " + JSON.stringify(db_data))

            return db_data;
        }

        validate(attrs, options) {
            return null;
        }
    }

    return PPMModel;
});
