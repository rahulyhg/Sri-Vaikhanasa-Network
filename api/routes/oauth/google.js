"use strict";


var passport = require("passport");

module.exports = function (app) {
    app.get("/auth/google", passport.authenticate("google",
        {
            scope: ["https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"]
        }),
        function (req, res) { } // this never gets called
    );

    app.get("/oauth2callback", passport.authenticate("google",
        { successRedirect: "/api/article", failureRedirect: "/api/article" }
    ));
};