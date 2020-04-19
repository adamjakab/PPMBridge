/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['model/Card', 'model/PPMModel'], function (Card, PPMModel) {
    describe("Card", function () {

        it("should return its name", function () {
            let card_name = "Jack"
            let card = new Card({
                name: card_name
            });
            expect(card).toBeInstanceOf(Card)
            expect(card).toBeInstanceOf(PPMModel)
        });

    });
});

