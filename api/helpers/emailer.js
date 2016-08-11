"use strict";

var nodemailer = require("nodemailer");
var mgTransport = require("nodemailer-mailgun-transport");
var app = global.app;

exports.sendEmail = function(senderName, toList, ccList, bccList, subject, message, error, done) {

    var options = {
        auth: {
            api_key: app.get("MAILGUN_KEY"),
            domain: "srivaikhanasa.net"
        }
    }

    var nodemailerMailgun = nodemailer.createTransport(mgTransport(options));

    nodemailerMailgun.sendMail({
        from: "noreply@srivaikhanasa.net",
        to: toList,
        //cc: ccList,
        bcc: bccList,
        subject: subject,
        html: message,
    }, function(err, info) {
        if (err && error) {
            error(err);
        }
        else if (done) {
            done();
        }
    });

}