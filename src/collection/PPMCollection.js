/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'backbone', 'bluebird'], function (_, Backbone, Promise) {

    class PPMCollection extends Backbone.Collection {
        constructor() {
            super();
            Backbone.Collection.apply(this, arguments);
        }

        modelId(attrs) {
            return _.has(attrs, "id") ? attrs.id : null;
        }

        /**
         * Save all dirty models in the collection
         * @param {{}} [options]
         * @returns {Promise}
         */
        save(options) {
            let self = this;
            return new Promise(function (resolve, reject) {
                let save_promises = _.map(self.getDirtyModels(), function (model) {
                    return model.save(null, options);
                });
                Promise.all(save_promises).then(function () {
                    resolve();
                }).catch(function (xhr) {
                    reject(xhr);
                });
            });
        }

        /**
         * Destory all clean models in the collection
         * @param {{}} [options]
         * @returns {Promise}
         */
        destroy(options) {
            let self = this;
            return new Promise(function (resolve, reject) {
                let destroy_promises = _.map(self.getCleanModels(), function (model) {
                    return model.destroy(options);
                });
                Promise.all(destroy_promises).then(function () {
                    resolve();
                }).catch(function (xhr) {
                    reject(xhr);
                });
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

            // Disable parsing of individual models (we are doing it now)
            options["parse"] = false;

            let collection_data = [];
            if (!operation_data.error && operation_data.data.length >= 0) {
                collection_data = operation_data.data;
            } else {
                console.debug("Collection parse error: ", operation_data.message, operation_data);
            }

            return collection_data;
        }

        getDirtyModels() {
            return _.filter(this.models, function (model) {
                return model.hasChanged() || model.isNew();
            });
        }

        getCleanModels() {
            return _.filter(this.models, function (model) {
                return !(model.hasChanged() && model.isNew());
            });
        }

        getDirtyModelCount() {
            return this.getDirtyModels().length
        }

        getCleanModelCount() {
            return this.getCleanModels().length
        }
    }

    return PPMCollection;
});
