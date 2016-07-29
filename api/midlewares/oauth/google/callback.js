"use strict";

// module dependencies
var mongoose = require("mongoose");
var ExternalUser = mongoose.model("ExternalUser");

// winston logger
var winston = require("winston");

module.exports = function(request, accessToken, refreshToken, profile, done) {
    ExternalUser.findOne({
        email: profile.email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        else if (!user) {
            //No user was found... so create a new user with values from Google (all the profile. stuff)
            var usr = new ExternalUser();
            usr.providerId = profile._json.id;
            usr.provider = profile._json.provider;
            usr.token = accessToken;
            usr.email = profile.email;
            usr.name = profile._json.displayName;
            usr.profile = profile;
            winston.info("creating user");
            usr.save(function(err, usr, num) {
                if (err) {
                    winston.info('error saving user');
                }
                return done(err, user);
            });
        }
        else {
            //found user. update in database and Return
            user.providerId = profile._json.id;
            user.provider = profile._json.provider;
            user.token = accessToken;
            user.email = profile.email;
            user.name = profile._json.displayName;
            user.profile = profile;
            winston.info("updating user");
            user.save(function(err, usr, num) {
                if (err) {
                    winston.info('error saving user');
                }
                return done(err, user);
            });
        }
    });
};