'use strict';
/*
Main entry point for svn api server program
*/

// Module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');

// making mongoose to use bluebird promises library
mongoose.Promise = require('bluebird');

// Create our app
var app = express();

// registering the body parser modules
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// registering mongoose schemas
require('./api/models/article');
require('./api/models/user');

// registering all routing modules
require('./api/routes/article')(app);

var errorHandler = require('./api/controllers/error');
app.use(errorHandler.Handle);

// Starts app server so that REST services will be exposed
var host = process.env.OPENSHIFT_NODEJS_IP || config.appServer.host;
var port = process.env.OPENSHIFT_NODEJS_PORT || config.appServer.port;
app.listen(
    port,
    host,
    function () {
        console.log('Web server started and listening at ' + host + ':' + port);
    });

// connect database using mongoose framework
mongoose.connect(process.env.SVNDB_URL || config.dbServer.url);
var db = mongoose.connection;

// on error through the error
db.on('error', console.error.bind(console, 'Database connection error:'));
// on connect
db.once('open', function () {
    console.log('Database connection established successfully....');
});