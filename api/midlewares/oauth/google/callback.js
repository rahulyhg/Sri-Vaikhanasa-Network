"use strict";

// module dependencies
var mongoose = require("mongoose");
var User = mongoose.model("User");

// winston logger
var winston = require("winston");

// Module dependencies
var coalesce = require("coalescy");

// helper Function
var persistUser = function(user, accessToken, profile, done) {
    if (!user) {
        //No user was found... so create a new user with values from Google (all the profile. stuff)
        user = new User();
    }
    user.providerId = profile.id;
    user.provider = profile.provider;
    user.token = coalesce(accessToken, "12345"); // 12345 is for test account
    user.email = profile.email;
    user.name = profile.displayName;
    user.profile = profile;
    user
        .save()
        .then(function(usr) {
            return done(null, usr);
        })
        .catch(function(err) {
            winston.info("error saving user: " + err);
            return done(err);
        });
};

module.exports = function(req, accessToken, refreshToken, params, profile, done) {
    User
        .findOne({
            email: profile.email
        })
        .exec()
        .then(function(user) {
            persistUser(user, accessToken, profile, done);
        })
        .catch(function(err) {
            return done(err);
        });
};