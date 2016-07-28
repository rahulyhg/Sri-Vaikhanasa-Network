"use strict";

module.exports = function(app) {
    return {
        clientID: app.get("googleOAuthClientID"),
        clientSecret: app.get("googleOAuthClientSecret"),
        callbackURL: app.get("googleOAuthCallbackUrl"),
        passReqToCallback: true
    };
};