/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'test/test_helper', 'model/PPMModel'], function (_, TestHelper, PPMModel) {
    describe("PPMModel", function () {

        it("should clean changed attributes of new models on sync event", function () {
            let xhr = null
            let original_set = {name: "Card 1"}
            let ppm_model = new PPMModel(original_set);
            expect(ppm_model.isNew()).toBeTrue()
            expect(ppm_model.changed).toEqual({})
            expect(ppm_model._previousAttributes).toEqual({})
            let change_set = {"identifier": "ABC"}
            ppm_model.set(change_set)
            expect(ppm_model.changed).toEqual(change_set)
            expect(ppm_model._previousAttributes).toEqual(original_set)
            ppm_model.trigger("sync", ppm_model, xhr, {backbone_operation: {method: "create", element: "model"}})
            expect(ppm_model.changed).toEqual({})
            expect(ppm_model._previousAttributes).toEqual(_.extend(original_set, change_set))
        });

        it("should clean changed attributes of changed models on sync event", function () {
            let xhr = null
            let original_set = {id: TestHelper.uuidv4(), name: "Card 1"}
            let ppm_model = new PPMModel(original_set);
            expect(ppm_model.isNew()).toBeFalse()
            expect(ppm_model.changed).toEqual({})
            expect(ppm_model._previousAttributes).toEqual({})
            let change_set = {"modified": new Date().toISOString()}
            ppm_model.set(change_set)
            expect(ppm_model.changed).toEqual(change_set)
            expect(ppm_model._previousAttributes).toEqual(original_set)
            ppm_model.trigger("sync", ppm_model, xhr, {backbone_operation: {method: "update", element: "model"}})
            expect(ppm_model.changed).toEqual({})
            expect(ppm_model._previousAttributes).toEqual(_.extend(original_set, change_set))
            console.log(ppm_model._previousAttributes)
        });

    });
});
