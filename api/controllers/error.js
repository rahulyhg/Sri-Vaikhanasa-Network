'use strict';

console.log("inside error controlelr");

var mongoose = require('mongoose');
var Error = require('../models/error');

exports.Handle = function (err, req, res, next) {
    var error = new Article();
    error.errorMessage = err.message;
    error.user = req.user;
    error.requestUrl = req.Url;

    error.save();
    next();
}
