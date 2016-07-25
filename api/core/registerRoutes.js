"use strinct";

// Module dependencies
var googleOAuthRoutes = require("../routes/oauth/google");
var articleApiRoutes = require("../routes/article");
var userApiRoutes = require("../routes/user");

module.exports = function (app) {
    // registering all routing modules
    googleOAuthRoutes(app);
    articleApiRoutes(app);
    userApiRoutes(app);    
};