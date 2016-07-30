"use strict";

var ensureAuthenticated = require("../midlewares/ensureAuthenticated");

module.exports = function(app) {
    app.route("/api/user/isAuthenticated")
        .get(ensureAuthenticated, function(req, res, next) {
            res.send(req.isAuthenticated());
        });
};