/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'backbone', 'model/PPMModel'], function (_, Backbone, PPMModel) {
    let card_defaults = {
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

    class Card extends PPMModel {
        url = "/card"
        defaults = card_defaults;

        validate(attrs, options) {
            let resp = super.validate(attrs, options);
            if (!resp) {
                let _attribute_keys = _.keys(attrs)
                let _allowed_keys = _.keys(card_defaults)
                let offending_keys = _.difference(_.keys(attrs), _allowed_keys);
                if (!_.isEmpty(offending_keys)) {
                    console.debug("Validate(Card) attribs: ", _attribute_keys)
                    console.debug("Validate(Card) allowed: ", _allowed_keys)
                    console.warn("Validate(Card) offending: ", offending_keys)
                    resp = new Error("Offending keys: " + offending_keys)
                }
            }
            return resp
        }
    }

    return Card;
});
