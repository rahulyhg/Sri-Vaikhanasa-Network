'use strict';

var mongoose = require('mongoose');
var Error = mongoose.model('Error');
var winston = require('winston');
var expressWinston = require('express-winston');

module.exports = function (app) {

    app.use(expressWinston.errorLogger({
        transports: [
            new (winston.transports.File)({
                filename: './log/api.log',
                colorize: true
            })
        ]
    }));

    app.use(function globalErrorHandler(err, req, res, next) {
        if (err) {
            var error = new Error({
                requestUrl: req.url,
                httpMethod: req.method,
                error: err,
                stackTrace: err.stack,
                user: req.user,
                clientIP: req.ip
            });
            error.save();
            return res.status(err.status || 500).json({
                message: getErrorMessage(err)
            });
        }
        next();
    });
}


/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function (err) {
    var output;

    try {
        var begin = 0;
        if (err.errmsg.lastIndexOf('.$') !== -1) {
            // support mongodb <= 3.0 (default: MMapv1 engine)
            // "errmsg" : "E11000 duplicate key error index: mean-dev.users.$email_1 dup key: { : \"test@user.com\" }"
            begin = err.errmsg.lastIndexOf('.$') + 2;
        } else {
            // support mongodb >= 3.2 (default: WiredTiger engine)
            // "errmsg" : "E11000 duplicate key error collection: mean-dev.users index: email_1 dup key: { : \"test@user.com\" }"
            begin = err.errmsg.lastIndexOf('index: ') + 7;
        }
        var fieldName = err.errmsg.substring(begin, err.errmsg.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

    } catch (ex) {
        output = 'Unique field already exists';
    }

    return output;
};

/**
 * Get the error message from error object
 */
var getErrorMessage = function (err) {

    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }

    return message;
};

// HTTP Status codes just for reference
// 200 - OK; Standard response for successful HTTP requests
// 201- Created; Request has been fulfilled.New resource created
// 204 - No Content; Request processed.No content returned
// 301 - Moved Permanently; This and all future requests directed to the given URI
// 304 - Not Modified; Resource has not been modified since last requested
// 400 - Bad Request; Request cannot be fulfilled due to bad syntax
// 401 - Unauthorized; Authentication is possible, but has failed
// 403 - Forbidden; Server refuses to respond to request
// 404 - Not Found; Requested resource could not be found
// 500 - Internal Server Error; Generic error message when server fails
// 501 - Not Implemented; Server does not recognize method or lacks ability to fulfill
// 503 - Service Unavailable; Server is currently unavailable