/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['collection/Deck', 'model/Card', 'backbone'], function (Deck, Card, Backbone) {
    describe("Deck", function () {

        it("should initialize empty", function () {
            let deck = new Deck();
            assert.isObject(deck)
            assert.instanceOf(deck, Backbone.Collection)
            assert.equal(0, deck.length)

            // console.info(deck)
        })

        it("should initialize with cards", function () {
            let cards = [
                {id: 1, name: "card One"},
            ];
            let deck = new Deck(cards);
            assert.equal(cards.length, deck.length)
            assert.deepEqual(cards, deck.toJSON())

            let card_a = deck.get(1);
            assert.exists(card_a)
            assert.isObject(card_a)
            assert.instanceOf(card_a, Backbone.Model)


            // console.info(deck.url)
        })

    });
});


