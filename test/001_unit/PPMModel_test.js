/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['model/PPMModel'], function (PPMModel) {
    describe("PPMModel", function () {

        it("should return its name", function () {
            let card_name = "Jack"
            let m = new PPMModel({
                name: card_name
            });
            assert.strictEqual(m.get("name"), card_name)
        });

    });
});
