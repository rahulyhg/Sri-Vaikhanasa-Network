"use strict";

// Module dependencies
var config = require("config");

module.exports = function(app) {
    app.set("host", coalesce(process.env.OPENSHIFT_NODEJS_IP, process.env.IP, config.appServer.host));
    app.set("port", coalesce(process.env.OPENSHIFT_NODEJS_PORT, process.env.PORT, config.appServer.port));
    app.set("connectionString", coalesce(process.env.SVNDB_URL, config.dbServer.url));
    app.set("tokenPrivateKey", coalesce(process.env.SVN_SECRET_CODE, config.tokenPrivateKey));
    app.set("tokenExpiresIn", config.tokenExpiresIn);
    app.set("googleOAuthClientID", process.env.SVN_GOOGLE_CLIENTID);
    app.set("googleOAuthClientSecret", process.env.SVN_GOOGLE_CLIENTSECRET);
    app.set("googleOAuthCallbackUrl", process.env.SVN_GOOGLE_CALLBACK_URL);
};

function coalesce() {
    var i, arg;

    for (i = 0; i < arguments.length; i++) {
        arg = arguments[i];
        if (arg !== null && arg !== undefined &&
            (typeof arg !== 'number' || arg.toString() !== 'NaN')) {
            return arg;
        }
    }
    return null;
}
