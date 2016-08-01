"use strict";

// Module dependencies
var passport = require("passport");
var GoogleTokenStrategy = require("passport-google-token").Strategy;
var app = global.app;

passport.use(new GoogleTokenStrategy({
    name: "google-token",
    clientID: app.get("GOOGLE_CLIENT_ID"),
    clientSecret: app.get("GOOGLE_CLIENT_SECRET"),
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

// Url to invalidate google oauth2 access token
// https://accounts.google.com/o/oauth2/revoke?token={token}