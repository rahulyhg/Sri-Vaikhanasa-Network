'use strict';

var isLoggedIn = function () {
    return true;
};

var isAuthor = function () {
    return true;
}

exports.logRequest = function (req, res, next) {
    console.log('request from ip "' + req.ip + '" to url "' + req.url + '" at ' + new Date());
    next();
};

exports.isAuthenticated = function (req, res, next) {
    console.log('Authentication check');
    if (isLoggedIn()) { next(); }
    else { res.send('Authentication failed...'); }
};

exports.isAuthorized = function (req, res, next) {
    console.log('Authorization check');
    if (isAuthor()) { next(); }
    else { res.send('Authorization failed...'); }
};
