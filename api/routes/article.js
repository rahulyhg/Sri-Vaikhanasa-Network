"use strict";

var article = require("../controllers/article");
var ensureAuthenticated = require("../midlewares/ensureAuthenticated");

module.exports = function (app) {
    // Articles collection routes
    app.route("/api/article")
        .get(article.list)
        .put(ensureAuthenticated, article.create);

    // Single article routes
    app.route("/api/article/:articleId")
        .get(article.read)
        .post(ensureAuthenticated, article.update)
        .delete(ensureAuthenticated, article.delete);

    // Finish by binding the article middleware
    app.param("articleId", article.articleByID);
};