"use strict";


var passport = require("passport");

module.exports = function(app) {
    app.get("/auth/google",
        passport.authenticate("google", {
            session: false,
            accessType: 'offline',
            approvalPrompt: 'force',
            scope: ["https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ]
        }),
        function(req, res) {} // this never gets called
    );

    app.get("/oauth2callback",
        passport.authenticate("google", {
            session: false,
            successRedirect: "/auth/google/success",
            failureRedirect: "/auth/google/failure"
        })
    );

    app.get("/auth/google/success",
        function(req, res) {
            res.send("Success");
        }
    );

    app.get("/auth/google/failure",
        function(req, res, next) {
            next("Google authentication failed");
        }
    );
};