"use strict";

// Module dependencies
var passport = require("passport");
var app = global.app;
app.use(passport.initialize());

// used to serialize the user
passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
    done(null, user);
});