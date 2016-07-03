'use strict';
/*
Handler that handles authentication related operations 
*/

module.exports = function authenticationHandler(req, res, next) {
    console.log('Authentication check');

    var isLoggedIn = true;

    if (isLoggedIn) { next(); }
    else { res.send('Authentication failed...'); }
}