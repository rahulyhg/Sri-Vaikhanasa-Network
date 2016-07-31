"use strict";

var ensureAuthenticated = require("../midlewares/ensureAuthenticated");

module.exports = function(app) {
    app.route("/api/user/isAuthenticated")
        .get(ensureAuthenticated, function(req, res) {
            res.send(req.isAuthenticated());
        });
};