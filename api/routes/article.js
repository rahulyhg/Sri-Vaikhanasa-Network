'use strict';

var article = require('../controllers/article');
var isAuthenticated = require('../midlewares/isAuthenticatedUser');

module.exports = function (app) {
    // Articles collection routes
    app.route('/api/article')
        .get(article.list)
        .put(isAuthenticated, article.create);

    // Single article routes
    app.route('/api/article/:articleId')
        .get(article.read)
        .post(article.update)
        .delete(article.delete);

    // Finish by binding the article middleware
    app.param('articleId', article.articleByID);
}