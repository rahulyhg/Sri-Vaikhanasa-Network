'use strict';

// Module dependencies
var config = require('config');

module.exports = function (app) {
    // Starts app server so that REST services will be exposed
    var host = process.env.OPENSHIFT_NODEJS_IP || config.appServer.host;
    var port = process.env.OPENSHIFT_NODEJS_PORT || config.appServer.port;
    app.listen(
        port,
        host,
        function () {
            console.log('Web server started and listening at ' + host + ':' + port);
        });
}
