"use strict";

// winston logger
var winston = require("winston");

module.exports = function (app) {
    // Starts app server so that REST services will be exposed
    var server = app.listen(
        app.get("port"),
        app.get("host"),
        function () {
            winston.info("Web server started and listening at " + JSON.stringify(server.address()));
            app.emit("appServerStarted");
        });
};
