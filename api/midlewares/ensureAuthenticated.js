"use strict";

module.exports = function ensureAuthenticated(req, res, next) {
    console.log("is auth: " + req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/auth/google");
}