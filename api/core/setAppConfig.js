"use strict";

// Module dependencies
var config = require("config");

module.exports = function (app) {
    app.set("host", getHost());
    app.set("port", getPort());
    app.set("connectionString", getDbConnUr());
    app.set("tokenPrivateKey", getSecretForToken());
    app.set("tokenExpiresIn", config.tokenExpiresIn);
    app.set("googleOAuthClientID", process.env.SVN_GOOGLE_CLIENTID);
    app.set("googleOAuthClientSecret", process.env.SVN_GOOGLE_CLIENTSECRET);
    app.set("googleOAuthCallbackUrl", process.env.SVN_GOOGLE_CALLBACK_URL);
};

var getHost = function(){
    return process.env.OPENSHIFT_NODEJS_IP || process.env.IP || config.appServer.host;
};

var getPort = function(){
    return process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || config.appServer.port;
};

var getDbConnUr = function(){
    return process.env.SVNDB_URL || config.dbServer.url;
};

var getSecretForToken = function(){
    return process.env.SVN_SECRET_CODE || config.tokenPrivateKey;
};

