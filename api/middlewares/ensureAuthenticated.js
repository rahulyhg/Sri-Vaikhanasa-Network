"use strict";

// Module dependencies
var passport = require("passport");

// Export authenticate method as middleware module
module.exports = passport.authenticate("google-token", { session: false });