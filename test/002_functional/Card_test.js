/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['test/test_helper', 'collection/Deck', 'model/Card', 'PPMBridge'],
    function (TestHelper, Deck, Card, PPMBridge) {

        describe("Card", function () {

            beforeEach(function (done) {
                TestHelper.truncate_db_tables(["cards"]).then(function () {
                    done()
                }).catch(function () {
                    done()
                })
            });

            it("should create new item", function (done) {
                let card_data = {
                    name: "card 12",
                    collection: "password",
                }
                let card = new Card(card_data);

                card.on("sync", function (model, response, options) {
                    // console.log("response: ", response);
                    console.log("response: ", model.toJSON());
                    assert.isFalse(response.error, "Database operation error: " + response.message);
                    assert.isFalse(model.isNew(), "Card was not created!");
                    assert.isFalse(model.hasChanged());
                    assert.isFalse(model.changedAttributes());
                    assert.isNull(model.previous());
                    //
                    assert.equal(card_data.name, card.get("name"))
                    assert.equal(card_data.collection, card.get("collection"))
                    assert.lengthOf(card.get("id"), 36)
                    assert.equal(PPMBridge.getOption("username"), card.get("owner"))


                    done()
                });

                card.save(null, {wait: true});
            });


            // it("should fetch values by id", function (done) {
            //     let id = "a88d8f1d-7dd2-435b-8236-3df166e63384"
            //     let card = new Card({id: id});
            //     card.fetch({
            //         validate: true,
            //         success: function (model, response, options) {
            //             // console.log("Fetched card: ", model.toJSON())
            //             assert.equal(id, model.get("id"));
            //             assert.isNotEmpty(model.get("name"));
            //             assert.isNotEmpty(model.get("collection"));
            //             assert.isNotEmpty(model.get("owner"));
            //             assert.isNotEmpty(model.get("created"));
            //             assert.isNotEmpty(model.get("modified"));
            //             done()
            //         },
            //     })
            // });


            // it("should delete", function (done) {
            //     let id = "a87d1c33-d4bf-43cc-a0a1-4c1855f9db53";
            //     let card = new Card({id: id});
            //     card.once("destroy", function (model, collection, options) {
            //         console.log("destroyed")
            //         done()
            //     });
            //     card.destroy({wait:true});
            // });

            // it("should update", function (done) {
            //     let card_data = {
            //         name: "card 16",
            //         collection: "password",
            //     }
            //     let card = new Card(card_data);
            //
            //     card.once("sync", function (model, options) {
            //         assert.isFalse(model.isNew(), "Card was not created!")
            //         //now we have a new item stored in the db
            //         card.set({identifier: "site\.com"});
            //         card.once("sync", function (model, options) {
            //             //now we have the item updated
            //             assert.isFalse(model.hasChanged(), "Card was not updated!")
            //             done()
            //         });
            //         card.save();
            //     });
            //     card.save();
            // });

            // it("should create new item", function (done) {
            //     let card_data = {
            //         name: "card 12",
            //         collection: "password",
            //     }
            //     let card = new Card(card_data);
            //
            //     card.on("sync", function (model, options) {
            //         assert.isFalse(model.isNew(), "Card was not created!")
            //         done()
            //     });
            //     card.save();
            // });


        });
});
