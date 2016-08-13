"use strict";

var request = require("request");
var app = global.app;

exports.validate = function(req, res, next) {

    var secretKey = app.get("RECAPTCHA_SECRET");

    var postData = {
        secret: secretKey,
        response: req.body.gRecaptchaResponse,
        remoteip: req.connection.remoteAddress // req.connection.remoteAddress will provide IP address of connected user.
    };

    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify";

    var options = {
        method: 'post',
        body: postData,
        json: true,
        url: verificationUrl
    };

    // Hitting POST request to the URL, Google will respond with success or error scenario.
    request(options, function(error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            return next("Failed captcha verification");
        }
        next();
    });

};