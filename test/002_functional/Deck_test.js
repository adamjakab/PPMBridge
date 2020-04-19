/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'test/test_helper', 'collection/Deck', 'model/Card', 'PPMBridge', 'bluebird'],
    function (_, TestHelper, Deck, Card, PPMBridge, Promise) {
        let JasmineOriginalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        let _PPMUSER_ = PPMBridge.getOption("username");

        describe("Deck", function () {

            beforeEach(function () {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;
                return TestHelper.truncate_db_tables(["cards"]).then(function () {
                    // console.log("tables cleared");
                })
            });

            afterEach(function () {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = JasmineOriginalTimeout;
            });

            it("should fetch empty collection", function () {
                return new Promise(function (resolve) {
                    let deck = new Deck();
                    deck.fetch({validate: true}).then(function (response) {
                        expect(response["db_response"]["response"]["error"]).toBeFalse("DB error: " + response.message)
                        expect(deck.length).toEqual(0)
                        resolve()
                    });
                });
            });

            it("should fetch non-empty collection", function () {
                return new Promise(function (resolve) {
                    let expected1 = {
                        id: TestHelper.uuidv4(),
                        name: "Note 1",
                        collection: "note",
                        owner: _PPMUSER_,
                    }
                    let expected2 = {
                        id: TestHelper.uuidv4(),
                        name: "Password 1",
                        collection: "password",
                        owner: _PPMUSER_,
                    }
                    let pasture = [
                        {table: "cards", data: [expected1, expected2]}
                    ];

                    let deck = new Deck();

                    TestHelper.feed_db_tables(pasture).then(function () {
                        return deck.fetch({validate: true});
                    }).then(function (response, status) {
                        expect(response["db_response"]["response"]["error"]).toBeFalse("DB error: " + response.message)
                        expect(deck.length).toEqual(pasture[0]["data"].length)
                        // Card 1
                        let card1 = deck.get(expected1.id)
                        expect(card1.get("id")).toEqual(expected1.id)
                        expect(card1.get("name")).toEqual(expected1.name)
                        expect(card1.get("collection")).toEqual(expected1.collection)
                        expect(card1.get("owner")).toEqual(expected1.owner)
                        expect(card1.isNew()).toBeFalse();
                        expect(card1.hasChanged()).toBeFalse();
                        // Card 2
                        let card2 = deck.get(expected2.id)
                        expect(card2.get("id")).toEqual(expected2.id)
                        expect(card2.get("name")).toEqual(expected2.name)
                        expect(card2.get("collection")).toEqual(expected2.collection)
                        expect(card2.get("owner")).toEqual(expected2.owner)
                        expect(card2.isNew()).toBeFalse();
                        expect(card2.hasChanged()).toBeFalse();

                        resolve()
                    });
                });
            });


            it("should save new models", function () {
                return new Promise(function (resolve, reject) {
                    let max = 5
                    let deck = new Deck();
                    for (let i = 1; i <= max; i++) {
                        let card_data = {name: "Note-" + i, collection: "note", owner: _PPMUSER_};
                        let card = new Card(card_data);
                        deck.add(card)
                    }
                    expect(deck.getDirtyModelCount()).toEqual(deck.length);

                    deck.save().then(function () {
                        expect(deck.getDirtyModelCount()).toEqual(0);
                        return TestHelper.get_db_tables(["cards"]);
                    }).then(function (data) {
                        expect(data["response"]["data"]["cards"].length).toEqual(max)
                        resolve()
                    }).catch(function (xhr) {
                        reject(new Error("At least one model was not saved."));
                    });
                });
            });

            it("should save updated models", function () {
                return new Promise(function (resolve, reject) {
                    let id1 = TestHelper.uuidv4();
                    let id2 = TestHelper.uuidv4();
                    let identifier1 = "something-123"
                    let identifier2 = "something-987"
                    let expected1 = {
                        id: id1,
                        name: "Note 1",
                        collection: "note",
                        owner: _PPMUSER_,
                    }
                    let expected2 = {
                        id: id2,
                        name: "Password 1",
                        collection: "password",
                        owner: _PPMUSER_,
                    }
                    let pasture = [
                        {table: "cards", data: [expected1, expected2]}
                    ];

                    let deck = new Deck();

                    TestHelper.feed_db_tables(pasture).then(function () {
                        return deck.fetch({validate: true});
                    }).then(function (response, status) {
                        expect(response["db_response"]["response"]["error"]).toBeFalse("DB error: " + response.message)
                        expect(deck.length).toEqual(pasture[0]["data"].length)
                        expect(deck.getDirtyModelCount()).toEqual(0);
                        deck.get(id1).set({"identifier": identifier1})
                        deck.get(id2).set({"identifier": identifier2})
                        expect(deck.getDirtyModelCount()).toEqual(2);
                        return deck.save()
                    }).then(function () {
                        expect(deck.getDirtyModelCount()).toEqual(0);
                        resolve()
                    }).catch(function (xhr) {
                        reject(new Error("At least one model was not saved."));
                    });
                });
            });

            it("should save without any models", function () {
                return new Promise(function (resolve, reject) {
                    let deck = new Deck();
                    expect(deck.getDirtyModelCount()).toEqual(deck.length);
                    deck.save().then(function () {
                        expect(deck.getDirtyModelCount()).toEqual(0);
                        resolve()
                    }).catch(function (xhr) {
                        reject(new Error("At least one model was not saved."));
                    });
                });
            });

            it("should destroy clean models", function () {
                return new Promise(function (resolve, reject) {
                    let id1 = TestHelper.uuidv4();
                    let id2 = TestHelper.uuidv4();
                    let expected1 = {
                        id: id1,
                        name: "Note 1",
                        collection: "note",
                        owner: _PPMUSER_,
                    }
                    let expected2 = {
                        id: id2,
                        name: "Password 1",
                        collection: "password",
                        owner: _PPMUSER_,
                    }
                    let pasture = [
                        {table: "cards", data: [expected1, expected2]}
                    ];

                    let deck = new Deck();

                    TestHelper.feed_db_tables(pasture).then(function () {
                        return deck.fetch({validate: true});
                    }).then(function (response, status) {
                        expect(response["db_response"]["response"]["error"]).toBeFalse("DB error: " + response.message)
                        expect(deck.length).toEqual(pasture[0]["data"].length)
                        return deck.destroy();
                    }).then(function () {
                        expect(deck.length).toEqual(0)
                        return TestHelper.get_db_tables(["cards"]);
                    }).then(function (data) {
                        expect(data["response"]["data"]["cards"].length).toEqual(0)
                        resolve()
                    }).catch(function (xhr) {
                        reject(new Error("At least one model was not saved."));
                    });
                });
            });

        });
    });