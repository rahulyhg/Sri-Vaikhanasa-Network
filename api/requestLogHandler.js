'use strict';
/*
Handler that logs request url and client ip to console 
*/

module.exports = function authorizationHandler(req, res, next) {
    console.log('request from ip "' + req.ip + '" to url "' + req.url + '" at ' + new Date());
    next();
}