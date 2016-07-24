'use strict';

var expect = require("chai").expect;
var supertest = require('supertest');

var app = null;

before(function (done) {
    app.on("appServerStarted", function () {
        app.on("dbServerConnected", function () {
            console.log('I am up and running...');
            done();
        });
    });
     app = require('../server');
});

var api = supertest(app);
// var api = supertest('http://localhost:3000');

require('./auth')(api, expect);
// require('./article')(api, expect);