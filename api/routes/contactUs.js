"use strict";

var contactUs = require("../controllers/contactUsApi");

var app = global.app;

// Articles collection routes
app.route("/api/contactUs/submit")
    .put(contactUs.submit);