"use strict";

// winston logger
var winston = require("winston");

module.exports = function(request, accessToken, refreshToken, profile, done) {
    winston.info(profile); // TODO: Need to implement logic to persist the user profile
    done();
};