"use strict";

// Module dependencies
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
var config = require("./clientConfig");
var googleCallback = require("./callback");

// winston logger
var winston = require("winston");

module.exports = function(app) {
    // serialize and deserialize
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy(config(app), googleCallback));
};