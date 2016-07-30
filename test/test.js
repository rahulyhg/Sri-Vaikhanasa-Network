"use strict";

var expect = require("chai").expect;
var supertest = require("supertest");
var app = require("../server");
var api = supertest(app);

before(function(done) {
    app.on("dbServerConnected", function() {
        done();
    });
});

describe("SVN API Test", function() {

    require("./oauth")(api, expect);
    require("./article")(api, expect);

});