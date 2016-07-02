'use strict';

/*
server.js
*/

// external modules
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');

// internal modules
var services = require('./services');

// create our app
var app = express();

// registering required midlewares to our app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure all routes for articles related web api methods
var articles = services.GetServiceInstance('articles');
app.get('/articles', articles.findAll);
app.get('/articles/:id', articles.findById);
app.post('/articles/add', articles.add);
app.post('/articles/update/:id', articles.update);
app.delete('/articles/:id', articles.remove);

// configure all routes for temples related web api methods
var temples = services.GetServiceInstance('temples');
app.get('/temples', temples.findAll);
app.get('/temples/:id', temples.findById);
app.post('/temples/add', temples.add);
app.post('/temples/update/:id', temples.update);
app.delete('/temples/:id', temples.remove);

// called by main.js and start's the server
exports.start = function start(callback) {
    // Starts app server
    app.listen(
        config.appServer.port,
        config.appServer.host,
        function () {
            console.log('Web server started...');
            if (callback) callback();
        });

    // starts data services
    services.init();
}
