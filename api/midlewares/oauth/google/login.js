"use strict";

// Module dependencies
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

// winston logger
var winston = require("winston");

module.exports = function (app) {
    passport.use(new GoogleStrategy({
        clientID: "clientID",
        clientSecret: "clientSecret",
        callbackURL: "http://localhost:3000/oauth2callback",
        passReqToCallback: true
    },
        function (request, accessToken, refreshToken, profile, done) {
            winston.info(profile); // TODO: Need to implement logic to persist the user profile
            done();
        }
    ));
};