/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['model/PassCard'], function (PassCard) {
    describe("PassCard", function () {
        it("should return its name", function () {
            let card_name = "Jack"
            let pc = new PassCard({
                name: card_name
            });
            assert.strictEqual(pc.get("name"), card_name)
        });
    });
});

