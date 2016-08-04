"use strict";

module.exports = function(app, logger, done) {
    this.start = function() {
        // Starts app server so that REST services will be exposed
        var server = app.listen(
            app.get("PORT"),
            app.get("HOST"),
            function() {
                logger.info("Web server started and listening at " + JSON.stringify(server.address()));
                app.emit("appServerStarted");
            });
    }
}