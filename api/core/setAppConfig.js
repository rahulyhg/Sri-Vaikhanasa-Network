"use strict";

// Module dependencies
var config = require("config");
var coalesce = require("coalescy");

module.exports = function(app) {
    var ENV_VAR = process.env;
    
    app.set("host", coalesce(ENV_VAR.OPENSHIFT_NODEJS_IP, ENV_VAR.IP, config.appServer.host));
    app.set("port", coalesce(ENV_VAR.OPENSHIFT_NODEJS_PORT, ENV_VAR.PORT, config.appServer.port));
    app.set("connectionString", coalesce(ENV_VAR.SVNDB_URL, config.dbServer.url));
    app.set("tokenPrivateKey", coalesce(ENV_VAR.SVN_SECRET_CODE, config.tokenPrivateKey));
    app.set("tokenExpiresIn", config.tokenExpiresIn);
    app.set("googleOAuthClientID", ENV_VAR.SVN_GOOGLE_CLIENTID);
    app.set("googleOAuthClientSecret", ENV_VAR.SVN_GOOGLE_CLIENTSECRET);
    app.set("googleOAuthCallbackUrl", ENV_VAR.SVN_GOOGLE_CALLBACK_URL);
};