"use strict";

// Module dependencies
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
var config = require("./clientConfig");
var googleCallback = require("./callback");

// winston logger
var winston = require("winston");

module.exports = function(app) {
    app.use(passport.initialize());
    passport.use(new GoogleStrategy(config(app), googleCallback));
};