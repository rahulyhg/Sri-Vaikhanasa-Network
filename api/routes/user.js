"use strict";

var user = require("../controllers/user");
var ensureAuthenticated = require("../midlewares/ensureAuthenticated");

module.exports = function(app) {
    app.route("/api/user/authenticate")
        .post(user.authenticate);

    app.route("/api/user/isAuthenticated")
        .get(ensureAuthenticated);
};