'use strict';
/*
Main entry point for svn api server program
*/

// Module dependencies
var express = require('express');

// Create our app
var app = express();

// Init all app configurations
require('./api/core/setAppConfig')(app);

// register midlewares for http body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// register loggers
require('./api/midlewares/winstonLogger')(app);

// register models
require('./api/core/registerModels');

// register api routes
require('./api/core/registerRoutes')(app);

// registering error handlers
require('./api/midlewares/globalErrorHandler')(app);

// start db connectivity
require('./api/core/startDbConnection')(app);

// start app server
require('./api/core/startAppServer')(app);

module.exports = app;