var expect = require("chai").expect;
var supertest = require('supertest');
// var app = require('../server');
// var api = supertest(app);
var api = supertest('http://localhost:3000');

// before(function (done) {
//     if (app) {
//         app.on("appServerStarted", function () {
//             app.on("dbServerConnected", function () {
//                 done();
//             });
//         });
//     }
// });

require('./auth')(api, expect);
require('./article')(api, expect);