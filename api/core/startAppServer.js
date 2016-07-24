'use strict';

module.exports = function (app) {
    // Starts app server so that REST services will be exposed
    var server = app.listen(
        app.get('port'),
        app.get('host'),
        function () {
            console.log('Web server started and listening at ' + server.address.port);
            app.emit('appServerStarted');
        });
}
