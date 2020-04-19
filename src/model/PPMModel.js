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

            /**
             * The server returns the data of the created/updated model which is mapped to the model making it
             * result as a dirty model (model that needs saving)
             * The altered attributes are:
             * Create: (id, created, modified)
             * Modify: (modified)
             */
            this.on("sync", function (model, response, options) {
                if (_.has(options, "backbone_operation")) {
                    if (_.has(options["backbone_operation"], "method")) {
                        if (options.backbone_operation.method === "create") {
                            model.changed = {};
                            model._previousAttributes = _.clone(model.attributes);
                            // console.debug("Model synced after: " + JSON.stringify(options.backbone_operation))
                            // console.debug("Model synced: " + JSON.stringify(model))
                        } else if (options.backbone_operation.method === "update") {
                            if (_.keys(model.changed).length === 1 && _.contains(_.keys(model.changed), "modified")) {
                                model.changed = {};
                                model._previousAttributes = _.clone(model.attributes);
                            }
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
