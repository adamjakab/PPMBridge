/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'test/test_helper', 'collection/Deck', 'backbone'],
    function (_, TestHelper, Deck, Backbone) {
        describe("Deck", function () {

            it("should initialize empty", function () {
                let deck = new Deck();
                expect(deck).toBeInstanceOf(Deck)
                expect(deck.length).toBe(0)
            })

            it("should initialize with cards", function () {
                let id = TestHelper.uuidv4()
                let cards = [
                    {id: id, name: "card One"},
                ];
                let deck = new Deck(cards);
                expect(deck.length).toBe(cards.length)
                expect(deck.toJSON()).toEqual(cards)
            })

    });
});


