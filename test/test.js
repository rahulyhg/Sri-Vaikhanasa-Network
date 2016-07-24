'use strict';

var expect = require("chai").expect;
var supertest = require('supertest');

var app = require('../server');
var api = supertest(app);
before(function (done) {
    if (app) {
        app.on("appServerStarted", function () {
            app.on("dbServerConnected", function () {
                done();
            });
        });
    }
});

// var api = supertest('http://localhost:3000');

require('./auth')(api, expect);
require('./article')(api, expect);