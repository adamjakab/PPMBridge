/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['collection/Deck', 'model/Card'], function (Deck, Card) {
    describe("Deck", function () {


        // it("should reset", function (done) {
        //     let d = new Deck();
        //
        //     d.on("update", function(collection, options) {
        //         console.log("Deck has: " + d.length)
        //         if (d.length === 0) {
        //             done();
        //         }
        //     })
        //
        //     d.fetch({
        //         wait: true,
        //         success: function() {
        //             console.log("cards: " + JSON.stringify(d.models))
        //             let c;
        //             while (c = d.first()) {
        //                 c.destroy();
        //             }
        //         }
        //     })
        // });

        // it("should fetch the entire collection", function () {
        //     let deck = new Deck();
        //     deck.on("update", function(collection, options) {
        //         assert(true, "Success");
        //         console.log("fetched collection" + JSON.stringify(collection));
        //         assert(true, "Success");
        //     }).on("error", function(collection, xhr, options) {
        //         assert(false, "Xhr error.");
        //     });
        //
        //     deck.fetch({validate: true})
        // });


    });
});