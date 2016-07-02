'use strict';

// include required external modules
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');

// include required internal modules
var services = require('./services');
var routeConfig = require('./routeConfig');

// create our app
var app = express();

// registers the body parser which helps in reading req.body from api requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// register all routes to app
var router = express.Router();
routeConfig.register(router, services);
app.use('/', router);

// called by main.js and start's the server
exports.start = function start(callback) {

    // initialize mongo db connection
    services.init();

    // Starts app server so that REST services will be exposed
    app.listen(
        config.appServer.port,
        config.appServer.host,
        function () {
            console.log('Web server started...');
            if (callback) callback();
        });

}
