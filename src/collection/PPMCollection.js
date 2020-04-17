/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'backbone'], function (_, Backbone) {

    class PPMCollection extends Backbone.Collection {
        constructor() {
            super();
            Backbone.Collection.apply(this, arguments);
        }

        modelId(attrs) {
            return _.has(attrs, "id") ? attrs.id : null;
        }

        parse(data, options) {
            // console.debug("COLLECTION RAW DATA PARSE: " + JSON.stringify(data))
            // console.log("c-OPTIONS: " + JSON.stringify(options))

            // Disable parsing for individual models
            options["parse"] = false;

            let db_data = [];
            if (_.has(data, "db_response")) {
                if (_.has(data["db_response"], "response")) {
                    let db_response = data["db_response"]["response"];
                    if (_.has(db_response, "error") && !db_response["error"]) {
                        if (_.has(db_response, "data")) {
                            if (_.isArray(db_response["data"])) {
                                db_data = db_response["data"]
                            }
                        }
                    }
                }
            }
            // console.debug("COLLECTION PARSED DATA: " + JSON.stringify(db_data))

            return db_data;
        }
    }

    return PPMCollection;
});
