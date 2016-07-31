"use strict";

// Module dependencies
var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var BearerStrategy = require("passport-http-bearer").Strategy;

module.exports = function() {
    passport.use(
        new BearerStrategy(
            function(accessToken, done) {
                User.findOne({
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