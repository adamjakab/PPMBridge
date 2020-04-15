/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['backbone', 'underscore', 'model/PPMModel'], function (Backbone, _, PPMModel) {
    class PassCard extends PPMModel {
        url = "/passcard"
        defaults = {
            id: null,
            parent_id: null,
            name: null,
            collection: null,
            identifier: null,
            owner: null,
            created: null,
            modified: null,
            attr_count: 0
        };

        validate(attrs, options) {
            let resp = super.validate(attrs, options);
            if (!resp) {
                console.log("PC Validating: ", attrs)
                let offending_keys = _.difference(_.keys(attrs), _.keys(this.defaults));
                if (!_.isEmpty(offending_keys)) {
                    console.warn("Offending keys: ", offending_keys)
                    resp = new Error("Offending keys: " + offending_keys)
                }

            }

            return resp
        }

    }


    return PassCard;
});
