/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'collection/PPMCollection', 'model/Card'], function (_, PPMCollection, Card) {

    class Deck extends PPMCollection {
        url = "/deck"
        model = Card;

    }

    return Deck;
});
