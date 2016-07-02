'use strict';

var interceptors = require('./reqInterceptors')

exports.register = function (route, services) {

    // basic req interceptor that is applied to all routes
    route.use(interceptors.logRequest);

    // configure all route for articles related web api methods
    var articles = services.GetServiceInstance('articles');
    route.get('/articles', articles.findAll);
    route.get('/articles/:id', articles.findById);
    route.post('/articles/add', interceptors.isAuthenticated, articles.add);
    route.post('/articles/update/:id', interceptors.isAuthenticated, interceptors.isAuthorized, articles.update)
    route.delete('/articles/:id', interceptors.isAuthenticated, interceptors.isAuthorized, articles.remove);

    // configure all route for temples related web api methods
    var temples = services.GetServiceInstance('temples');
    route.get('/temples', temples.findAll);
    route.get('/temples/:id', temples.findById);
    route.post('/temples/add', interceptors.isAuthenticated, temples.add);
    route.post('/temples/update/:id', interceptors.isAuthenticated, interceptors.isAuthorized, temples.update);
    route.delete('/temples/:id', interceptors.isAuthenticated, interceptors.isAuthorized, temples.remove);

};