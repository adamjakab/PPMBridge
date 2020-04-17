/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'jquery', 'bluebird'], function (_, $, Promise) {

    let truncate_db_tables = function (dbs) {
        dbs = _.isArray(dbs) ? dbs : [dbs];
        return new Promise(function (resolve, reject) {
            let url = "/ppm/maintenance";
            let data = {"operation": "truncate", "table": dbs};
            console.debug("Test maintenance(" + url + "): " + JSON.stringify(data));
            $.ajax({
                url: url,
                method: "POST",
                cache: false,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(data)
            }).done(function () {
                // console.log("AJAX done")
                resolve()
            }).fail(function () {
                // console.log("AJAX fail")
                reject()
            });
        });
    }

    return {
        truncate_db_tables: truncate_db_tables,
    }
});



