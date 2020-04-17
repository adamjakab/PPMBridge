/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'backbone'], function (_, Backbone) {
    class PPMModel extends Backbone.Model {
        defaults = {};

        constructor() {
            super();
            Backbone.Model.apply(this, arguments);

            this.on("sync", function (model, response, options) {
                if (_.has(options, "backbone_operation")) {
                    if (_.has(options["backbone_operation"], "method")) {
                        // The "create" operation updates the model with new values(id,timestamps) from the server
                        // but we consider the model "clean" (unchanged respect to the server)
                        if (options.backbone_operation.method === "create") {
                            model.changed = {};
                            model._previousAttributes = {};
                        }
                    }
                }
            });
        }

        /**
         * The data received here is "model_data" prepared by BackboneAjaxSuccess method
         * @param {{error: boolean, message: string, data: Array}} operation_data
         * @param {{}} options
         * @returns {{}}
         */
        parse(operation_data, options) {
            // console.debug("Model PARSE RAW DATA: " + JSON.stringify(operation_data));
            // console.debug("m-OPTIONS: " + JSON.stringify(options))

            let model_data = {};
            if (!operation_data.error && operation_data.data.length === 1) {
                model_data = _.first(operation_data.data);
            } else {
                console.debug("Model parse error: ", operation_data.message, operation_data);
            }

            return model_data;
        }

        validate(attrs, options) {
            return null;
        }
    }

    return PPMModel;
});
