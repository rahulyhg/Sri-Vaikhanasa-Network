'use strict';

var app = null;

before(function (done) {
    app = require('../server');
    app.on("appServerStarted", function () {
        app.on("dbServerConnected", function () {
            console.log('I am up and running @ ' + app.webServer);
            done();
        });
    });    
});

// var api = supertest('http://localhost:3000');

require('./auth')(app);
// require('./article')(api, expect);