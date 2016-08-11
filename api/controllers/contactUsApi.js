"use strict";

var emailer = require("../helpers/emailer");

exports.submit = function(req, res, next) {

    var emailBody = "Hello " + req.body.name +
        ", <br/><br/>Thank you for writing to us.<br/><br/>Here is your message for your reference: " +
        req.body.message +
        "<br/><br/>We will get back to you soon on this.<br/><br/>" +
        "Regards,<br/>Sri Vaikhanasa Network Team" + 
        "<br/><br/>DO NOT REPLY TO THIS MAIL. THIS IS SYSTEM GENERATED MAIL...";

    var emailSubject = "Auto Mail: " + req.body.subject + " - " + req.body.name + " <" + req.body.email + ">";

    emailer.sendEmail(
        req.body.name,
        req.body.email,
        '',
        "admin@srivaikhanasa.net",
        emailSubject,
        emailBody,
        function(err) {
            next(err);
        },
        function() {
            res.send("Sent email...");
        });

}