"use strict";
/*
Main entry point for svn api server program
*/

process.env.SVNDB_URL = "mongodb://acharya:acharya@ds023694.mlab.com:23694/achmongodb";
process.env.SVN_GOOGLE_CLIENTSECRET = "OHYGL260130gWGcqEXD4BTXH";
process.env.SVN_GOOGLE_CLIENTID = "871728678221-17h5314uvca4i94q63edqu0uoshc8g5j.apps.googleusercontent.com";
process.env.SVN_GOOGLE_CALLBACK_URL = "https://sri-vaikhanasa-network-acharyarajasekhar.c9users.io/oauth2callback";

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
require("./middlewares/httpBodyParser");
require("./middlewares/winston.logger");
require("./middlewares/passport.authentication");

// Register all routes for api methods
require("./routes/article");
require("./routes/user");

// Register post request middlewares
require("./middlewares/globalErrorHandler");

// start db connectivity
require("./core/startDbConnection");

// start app server
require("./core/startAppServer");

// Export the app to outside wolrd
exports = module.exports = app;