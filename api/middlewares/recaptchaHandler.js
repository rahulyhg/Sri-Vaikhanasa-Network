"use strict";

var request = require("request");
var app = global.app;

exports.validate = function(req, res, next) {

    var secretKey = app.get("RECAPTCHA_SECRET");
    
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.gRecaptchaResponse + "&remoteip=" + req.connection.remoteAddress;

    // Hitting POST request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function(error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            return next("reCAPTCHA verification failed");
        }
        next();
    });

};