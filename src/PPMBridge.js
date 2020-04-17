/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'backbone'], function (_, Backbone) {
    // Store the references before overriding
    const _Backbone_sync = Backbone.sync;
    const _Backbone_ajax = Backbone.ajax;

    let get_backbone_element_type = function (el) {
        return el instanceof Backbone.Model ? "model" :
            el instanceof Backbone.Collection ? "collection" : null;
    }

    let get_db_request = function (method, el) {
        let answer = {};
        let el_type = get_backbone_element_type(el);
        switch (el_type) {
            case "model":
                switch (method) {
                    case "read":
                        answer = {
                            operation: "get_card",
                            id: el.get("id")
                        }
                        break;
                    case "create":
                    case "update":
                        answer = {
                            operation: "set_card"
                        }
                        let data = el.toJSON();
                        _.extend(answer, data);
                        break;
                    case "delete":
                        answer = {
                            operation: "del_card",
                            id: el.get("id")
                        }
                        break;
                }
                break;
            case "collection":
                switch (method) {
                    case "read":
                        answer = {
                            operation: "index",
                        }
                        break;
                }
                break;
        }

        return answer;
    }

    /**
     * https://backbonejs.org/#Sync
     *
     * @param {string} method  The CRUD method ("create", "read", "update", or "delete")
     * @param {Backbone.Model|Backbone.Collection} el
     * @param {{}} options  Success and error callbacks, and all other jQuery request options
     * @returns {*}
     */
    Backbone.sync = function (method, el, options) {
        let el_type = get_backbone_element_type(el);
        if (!el_type) {
            console.error("Backbone sync: Invalid element type!");
            return;
        }

        // Store the method and the element type on the options
        // console.debug("Backbone sync (method[type]): " + method + "[" + el_type + "]");
        options.backbone_operation = {
            method: method,
            element: el_type
        }

        // attributes added to options will also be added to xhr for the ajax call
        _.extend(options, {
            data: {
                db_request: get_db_request(method, el)
            },
        });

        return _Backbone_sync.call(this, method, el, options)
    };


    /**
     * @param {XMLHttpRequest} xhr
     */
    Backbone.ajax = function (xhr) {
        let data = {
            user: PPMBridgeOptions.username,
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
            data: raw_data
        });

        // Store the original "success" callback and pass it to our own "success" callback
        let _orig_success = xhr.success;
        xhr.success = function (data, result, xhr) {
            BackboneAjaxSuccess(data, result, xhr, _orig_success)
        }

        console.debug("Backbone request(" + xhr.url + "): " + raw_data);

        return _Backbone_ajax.call(this, xhr)
    };

    /**
     *
     * @param {{}} data
     * @param {string} result
     * @param {XMLHttpRequest} xhr
     * @param {function} success_callback
     * @constructor
     */
    let BackboneAjaxSuccess = function (data, result, xhr, success_callback) {
        // console.log("BackboneAjaxSuccess[data]: ", data);
        let operation_data = {
            error: true,
            message: "No response from server",
            data: []
        }

        if (_.has(data, "db_response")) {
            if (_.has(data["db_response"], "response")) {
                _.extend(operation_data, data["db_response"]["response"]);
            }
        }

        if (operation_data.error) {
            console.warn("DB ERROR: ", operation_data.message);
        }

        //here we can intercept on data
        // "request_number"
        // "left_pad_length"
        // "right_pad_length"
        // "seed"

        // Call the original Backbone "success" callback node_modules/backbone/backbone.js:603
        if (success_callback) {
            success_callback.call(this, operation_data)
        } else {
            console.warn("No Backbone success callback!")
        }
    }

    /**
     * @type {{username:string, password:string}}
     */
    let PPMBridgeOptions = {};

    /**
     * PPMBridge
     *
     * @private
     * @class PPMBridge
     */
    let PPMBridge = function () {
        //
    }

    /**
     *
     * @param {string} key
     * @param {*} [def]
     * @returns {*}
     */
    PPMBridge.prototype.getOption = function (key, def = null) {
        return _.has(PPMBridgeOptions, key) ? PPMBridgeOptions[key] : def;
    };

    /**
     *
     * @param {
     *      {username:string, password:string}
     * } opt
     */
    PPMBridge.prototype.setOptions = function (opt) {
        PPMBridgeOptions = opt;
        console.log("PPMBridge configured with: ", PPMBridgeOptions)
    };

    // Return a unique instance
    return new PPMBridge();
});
