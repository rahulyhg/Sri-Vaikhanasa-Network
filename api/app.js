"use strict";
/*
Main entry point for svn api server program
*/

// Create express web app and make it globally available
var app = require("express")();
global.app = app;

// Initialize required core functional modules
require("./core/initAppConfig");
require("./core/initApiModels");
require("./core/globalResultHandlers");

// Register oauth modules
require("./oauth/google");

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

// start db connectivity
require("./core/startDbConnection");

// start app server
require("./core/startAppServer");

// Export the app to outside wolrd
exports = module.exports = app;