"use strict";

module.exports = function(app) {
    return {
        authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
        tokenURL: 'https://accounts.google.com/o/oauth2/token',
        clientID: app.get("googleOAuthClientID"),
        clientSecret: app.get("googleOAuthClientSecret"),
        callbackURL: app.get("googleOAuthCallbackUrl"),
        passReqToCallback: true
    };
};