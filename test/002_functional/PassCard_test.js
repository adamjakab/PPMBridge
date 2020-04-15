/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */


/*
Backbone = require("backbone")
Backbone.sync = function (method, model, options) {

    options.host = "http://localhost:9999/ppm"

    console.log("Backbone sync method: " + method);
    console.log("Backbone sync model: " + JSON.stringify(model));
    console.log("Backbone sync options: " + JSON.stringify(options));

    _.extend(model.attributes, {
        parent_id: 1000
    });
};
*/

define(['model/PassCard'], function (PassCard) {
    describe("PassCard", function () {
        it("should return its name", function () {
            let card_name = "Jack"
            let pc = new PassCard({
                name: card_name
            });
            assert.strictEqual(pc.get("name"), card_name)
        });

        it("should fetch values", function () {
            let id = "a0f987a4-c257-4010-a603-904105af5d6c"
            let name = "PPM-1"
            let pc = new PassCard({
                id: id,
                name: name
            });
            pc.fetch()
            console.log(pc.toJSON())
        });
    });
});
