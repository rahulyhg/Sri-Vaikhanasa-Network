"use strict";

// Module dependencies
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
var config = require("./clientConfig");
var callback = require("./callback");

// winston logger
var winston = require("winston");

module.exports = function(app) {
    passport.use(new GoogleStrategy(config(app), callback));
};