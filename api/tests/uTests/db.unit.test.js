"use strict";

// External dependency modules
var mongoose = require("mongoose");
var bluebirdPromise = require("bluebird");
var winston = require("winston");
var expect = require("chai").expect;
var DbServer = require("../../core/dbServer");

describe("DB connectivity test", function() {
    it("With wrong connection string and expected to get error", function(done) {

        var dbServer = new DbServer(mongoose,
            "mongodb://db1.example.net,db2.example.net:2500/?replicaSet=test",
            bluebirdPromise,
            winston,
            function(err) {
                expect(err).to.not.be.null;
                done();
            });

        dbServer.connect();
    });
});