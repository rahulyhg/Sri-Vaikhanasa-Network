'use strict';
/*
Handler that handles authorization related operations 
*/

module.exports = function authorizationHandler(req, res, next) {
    console.log('Authorization check');

    var isLoggedIn = true;

    if (isLoggedIn) { next(); }
    else { res.send('Authorization failed...'); }
}