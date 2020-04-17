/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['model/Card'], function (Card) {
    describe("Card", function () {

        it("should return its name", function () {
            let card_name = "Jack"
            let pc = new Card({
                name: card_name
            });
            assert.strictEqual(pc.get("name"), card_name)
        });

    });
});

