'use strict';
/*
Core handler which decides the request execution flow for SVN Web API services 
*/

module.exports = function routeHandler(app, express) {

    // load below internal modules
    var repository = require('./repositoryHandler');
    var svnApiServicesHandler = require('./svnApiServicesHandler');
    var reqLogger = require('./requestLogHandler');
    var isAuthenticated = require('./authenticationHandler');
    var isAuthorized = require('./authorizationHandler');

    // create private variables
    var router = express.Router();
    var db = new repository();
    
    // connect to mongo db [As of now we are not using connection pooling. Will see when required...]
    //db.connect();

    // basic req interceptor that is applied to all routes
    router.use(reqLogger);

    // configure all route for articles related web api methods
    var articles = new svnApiServicesHandler('articles', db);
    router.get('/articles', articles.findAll);
    router.get('/articles/:id', articles.findById);
    router.post('/articles', isAuthenticated, articles.add);
    router.put('/articles/:id', isAuthenticated, isAuthorized, articles.update)
    router.delete('/articles/:id', isAuthenticated, isAuthorized, articles.remove);

    // configure all route for temples related web api methods
    var temples = new svnApiServicesHandler('temples', db);
    router.get('/temples', temples.findAll);
    router.get('/temples/:id', temples.findById);
    router.post('/temples', isAuthenticated, temples.add);
    router.put('/temples/:id', isAuthenticated, isAuthorized, temples.update);
    router.delete('/temples/:id', isAuthenticated, isAuthorized, temples.remove);

    app.use('/api', router)

    app.get('/', function (req, res) {
        var route, routes = [];
        app._router.stack.forEach(function (middleware) {
            if (middleware.route) { // routes registered directly on the app
                routes.push(middleware.route);
            } else if (middleware.name === 'router') { // router middleware 
                middleware.handle.stack.forEach(function (handler) {
                    route = handler.route;
                    route && routes.push(route);
                });
            }
        });
        res.send(routes);
    });
}

