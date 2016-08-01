"use strict";

// winston logger
var winston = require("winston");
var app = global.app;

// Starts app server so that REST services will be exposed
var server = app.listen(
    app.get("PORT"),
    app.get("HOST"),
    function() {
        winston.info("Web server started and listening at " + JSON.stringify(server.address()));
        app.emit("appServerStarted");
    });