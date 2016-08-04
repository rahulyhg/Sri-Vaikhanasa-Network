"use strict";

var supertest = require("supertest");
var app = require("../../app");
global.api = supertest(app);
global.expect = require("chai").expect;
global.bearerToken = app.get("GOOGLE_ACCESS_TOKEN");

before(function(done) {
    app.on("appServerStarted", function() {
        done();
    });
});

describe("Integration Tests", function() {
    require("./google.auth");
    require("./article");
});