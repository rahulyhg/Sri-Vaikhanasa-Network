'use strict';
/*
Main module that wires up all routing logic using route handler and then starts svn API server  
*/

exports.start = function svnApiServer() {

    // include required external modules
    var express = require('express');
    var bodyParser = require('body-parser');
    var config = require('config');

    // include required internal modules
    var routeHandler = require('./routeHandler');

    // create our app
    var app = express();

    // registers the body parser which helps in reading req.body from api requests
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // register all routes to app
    routeHandler(app, express);

    // Starts app server so that REST services will be exposed
    app.listen(
        process.env.OPENSHIFT_NODEJS_PORT || config.appServer.port,
        process.env.OPENSHIFT_NODEJS_IP || config.appServer.host,
        function () {
            console.log('Web server started...');
        });
        
}