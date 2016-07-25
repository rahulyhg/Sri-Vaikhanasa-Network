"use strinct";

var articleApiRoutes = require("../routes/article");
var userApiRoutes = require("../routes/user");

module.exports = function (app) {
    // registering all routing modules
    articleApiRoutes(app);
    userApiRoutes(app);
};