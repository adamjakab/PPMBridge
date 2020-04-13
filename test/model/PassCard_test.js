/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

require('../bootstrap');
const {assert} = require('chai');

// Module to test
PassCard = require("../../lib/ppm_bridge/model/PassCard");

describe("PassCard", function () {
    it("should return its name", function () {
        let card_name = "Jack"
        let pc = new PassCard.PassCard({
            name: card_name
        });
        assert.strictEqual(pc.get("name"), card_name)
    });
});

