/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

/*
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
        it("should fetch values by id", function () {
            let id = "a88d8f1d-7dd2-435b-8236-3df166e63384"
            let pc = new PassCard({id: id});
            pc.fetch({
                validate: true,
                success: function (model, response, options) {
                    console.log(model.toJSON())
                    assert.equal(id, model.get("id"));
                    assert.isNotEmpty(model.get("name"));
                    assert.isNotEmpty(model.get("collection"));
                    assert.isNotEmpty(model.get("owner"));
                    assert.isNotEmpty(model.get("created"));
                    assert.isNotEmpty(model.get("modified"));
                }
            })
            //console.log(pc.toJSON())
        });
    });
});
