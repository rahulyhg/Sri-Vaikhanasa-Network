'use strict';

var user = require('../controllers/user');

module.exports = function (app) {
    app.route('/api/user/authenticate')
        .post(user.authenticate);

	// Users collection routes
    app.route('/api/user')
        //.get(articles.list)
        .put(user.create);
};