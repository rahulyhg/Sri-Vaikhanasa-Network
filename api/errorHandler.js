'use strict';
/*
Handler any errors raised during request process pipeline 
*/

module.exports = function errorHandler(err, req, res, next) {
    if (err) {
        res.status(500).send({ message : err });
    }
    else {
        next();
    }
}