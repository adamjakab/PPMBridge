/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'test/test_helper', 'collection/Deck', 'model/Card', 'PPMBridge', 'bluebird'],
    function (_, TestHelper, Deck, Card, PPMBridge, Promise) {
        let _PPMUSER_ = PPMBridge.getOption("username");

        describe("Card", function () {

            beforeEach(function () {
                return TestHelper.truncate_db_tables(["cards"]).then(function () {
                    // console.log("tables cleared");
                });
            });

            it("should return error on not found", function () {
                return new Promise(function (resolve) {
                    let id = "this-id-does-not-exist"
                    let card = new Card({id: id});
                    card.fetch({
                        success: function (model, response, options) {
                            expect(response.error).toBeTrue();
                            resolve();
                        },
                    })
                });
            });

            it("should fetch card by id", function () {
                return new Promise(function (resolve) {
                    let expected = {
                        id: "a88d8f1d-7dd2-435b-8236-3df166e63384",
                        name: "Card-128",
                        collection: "note",
                        owner: _PPMUSER_,
                    }
                    let pasture = [
                        {table: "cards", data: [expected]}
                    ];

                    TestHelper.feed_db_tables(pasture).then(function () {
                        let card = new Card({id: expected.id});

                        card.on("sync", function (model, response, options) {
                            expect(response.error).toBeFalse("Database operation error: " + response.message);
                            expect(expected.id).toEqual(model.get("id"))
                            expect(expected.name).toEqual(model.get("name"))
                            expect(expected.collection).toEqual(model.get("collection"))
                            expect(expected.owner).toEqual(model.get("owner"))
                            expect(card).toEqual(model)
                        });

                        return card.fetch({validate: true});

                    }).then(function (response) {
                        resolve()
                    });
                });
            });

            it("should create new item", function () {
                return new Promise(function (resolve) {
                    let card_data = {
                        name: "card 123",
                        collection: "password",
                    }

                    let card = new Card(card_data);

                    card.on("sync", function (model, response, options) {
                        expect(response.error).toBeFalse("Database operation error: " + response.message);
                        expect(model.isNew()).toBeFalse("Card was not created!");
                        expect(model.hasChanged()).toBeFalse();
                        expect(model.changedAttributes()).toBeFalse();
                        expect(model.previous()).toBeNull();
                        //
                        expect(card_data.name).toEqual(card.get("name"))
                        expect(card_data.collection).toEqual(card.get("collection"))
                        expect(card.get("id").length).toBe(36)
                        expect(_PPMUSER_).toEqual(model.get("owner"))
                        expect(_.isEmpty(card.get("created"))).toBeFalse()
                        expect(_.isEmpty(card.get("modified"))).toBeFalse()
                        expect(card.get("attr_count")).toEqual(0)
                        resolve()
                    });

                    card.save();
                });
            });


            it("should delete", function () {
                return new Promise(function (resolve) {
                    let expected = {
                        id: "a88d8f1d-7dd2-435b-8236-3df166e63384",
                        name: "Card-128",
                        collection: "note",
                        owner: _PPMUSER_,
                    }
                    let pasture = [
                        {table: "cards", data: [expected]}
                    ];

                    TestHelper.feed_db_tables(pasture).then(function () {
                        let card = new Card({id: expected.id});

                        card.on("sync", function (model, response, options) {
                            expect(response.error).toBeFalse("Database operation error: " + response.message);
                            console.log("destroyed")
                            resolve()
                        });
                        //card.on("destroy", function (model, collection, options) {
                        card.destroy({wait: true});
                    });
                });
            });

            // it("should update", function () {
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


        });
});
