"use strict";

var contactUs = require("../controllers/contactUsApi");
var recaptcha = require("../middlewares/recaptchaHandler");

var app = global.app;

// Articles collection routes
app.route("/api/contactUs/submit")
    .put(recaptcha.validate, contactUs.submit);