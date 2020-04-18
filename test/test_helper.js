/*
 * Copyright: Copyright (c) 2020., Adam Jakab
 *
 * Author: Adam Jakab <adam at jakab dot pro>
 * License: MIT
 */

define(['underscore', 'jquery', 'bluebird'], function (_, $, Promise) {

    let get_db_tables = function (dbs) {
        return new Promise(function (resolve, reject) {
            dbs = _.isArray(dbs) ? dbs : [dbs];
            let url = "/ppm/maintenance";
            let data = {"operation": "dump", "table": dbs};
            console.debug("Test maintenance dump(" + url + "): " + JSON.stringify(data));
            $.ajax({
                url: url,
                method: "POST",
                cache: false,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(data),
                success: resolve,
                error: reject
            })
        });
    }

    let feed_db_tables = function (pasture) {
        return new Promise(function (resolve, reject) {
            pasture = _.isArray(pasture) ? pasture : [pasture];
            let url = "/ppm/maintenance";
            let data = {"operation": "feed", "pasture": pasture};
            console.debug("Test maintenance feed(" + url + "): " + JSON.stringify(data));
            $.ajax({
                url: url,
                method: "POST",
                cache: false,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(data),
                success: resolve,
                error: reject
            });
        });
    }

    let truncate_db_tables = function (dbs) {
        return new Promise(function (resolve, reject) {
            dbs = _.isArray(dbs) ? dbs : [dbs];
            let url = "/ppm/maintenance";
            let data = {"operation": "truncate", "table": dbs};
            console.debug("Test maintenance truncate(" + url + "): " + JSON.stringify(data));
            $.ajax({
                url: url,
                method: "POST",
                cache: false,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(data),
                success: resolve,
                error: reject
            })
        });
    }

    return {
        get_db_tables: get_db_tables,
        truncate_db_tables: truncate_db_tables,
        feed_db_tables: feed_db_tables,
    }
});



