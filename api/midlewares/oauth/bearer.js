"use strict";

// Module dependencies
var passport = require("passport");
var mongoose = require("mongoose");
var ExternalUser = mongoose.model("ExternalUser");
var BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function(app) {
    passport.use(
        new BearerStrategy(
            function(accessToken, done) {
                ExternalUser.findOne({
                        token: accessToken
                    })
                    .exec()
                    .then(function(user) {
                        if (!user) {
                            return done(null, false);
                        }
                        return done(null, user);
                    })
                    .catch(function(err) {
                        return done(err);
                    });
            }
        )
    );
};