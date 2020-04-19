/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'collection/PPMCollection'], function (_, PPMCollection) {
    describe("PPMCollection", function () {

        it("should initialize", function () {
            let collection = new PPMCollection()
            expect(collection).toBeInstanceOf(PPMCollection)
        })

    });
});
