"use strict";
/*
Main entry point for svn api server program
*/

// External dependency modules
var mongoose = require("mongoose");
var promise = require("bluebird");
var logger = require("winston");
var DbServer = require("./core/dbServer");
var AppServer = require("./core/appServer");

var done = function(nextAction) {
    return function(err) {
        if (err) {
            logger.log("Program aborted due to: " + err);
        }
        else if (nextAction) {
            nextAction();
        }
    }
}

// Create express web app and make it globally available
var app = require("express")();
global.app = app;

// Initialize required core functional modules
require("./core/initAppConfig");
require("./core/initApiModels");

// Register global middlewares that will be used in request processing pipeline
require("./middlewares/addRequestId");
require("./middlewares/httpBodyParser");
require("./middlewares/winston.logger");
require("./middlewares/passport.authentication");

// Register all routes for api methods
require("./routes/article");
require("./routes/user");

// Register post request middlewares
require("./middlewares/winston.errorLogger");
require("./middlewares/globalErrorHandler");

// start db connectivity and app server
var connectionUrl = app.get("DB_CONN_URL");
var appServer = new AppServer(app, logger, null);
var dbServer = new DbServer(mongoose, connectionUrl, promise, logger, done(appServer.start));
dbServer.connect();

// Export the app to outside wolrd
exports = module.exports = app;