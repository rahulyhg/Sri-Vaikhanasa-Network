'use strict';

module.exports = function (app) {
    // Starts app server so that REST services will be exposed
    app.listen(
        app.get('port'),
        app.get('host'),
        function () {
            console.log('Web server started and listening at ' + app.address());
            app.emit('appServerStarted');
        });
}
