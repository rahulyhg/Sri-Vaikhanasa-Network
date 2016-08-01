"use strict";

var supertest = require("supertest");
var app = require("../../app");
global.api = supertest(app);
global.expect = require("chai").expect;
global.bearerToken = process.env.GOOGLE_ACCESS_TOKEN;

before(function(done) {
    app.on("dbServerConnected", function() {
        done();
    });
});

describe("SVN API Test", function() {
    require("./google.auth");
    require("./article");
});