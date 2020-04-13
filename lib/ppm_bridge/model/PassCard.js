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
            name: null,
            identifier: null,
            payload: ""
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

    /**
     * Export for Node
     */
    if (typeof exports !== 'undefined') {
        exports.PassCard = PassCard;
    }

    return PassCard;
});
