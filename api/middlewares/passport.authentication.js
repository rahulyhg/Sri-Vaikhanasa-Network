"use strict";

// Module dependencies
require("../oauth/google");
var passport = require("passport");
var app = global.app;

app.use(passport.initialize());