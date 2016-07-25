"use strict";

// Module dependencies
var config = require("config");
var mongoose = require("mongoose");

// making mongoose to use bluebird promises library
mongoose.Promise = require("bluebird");

// winston logger
var winston = require("winston");

module.exports = function (app) {
    // connect database using mongoose framework
    mongoose.connect(app.get("connectionString"));
    var db = mongoose.connection;

    // on error through the error
    db.on("error", function () { winston.error("Database connection error:"); });
    // on connect
    db.once("open", function () {
        winston.info("Database connection established successfully....");
        app.emit("dbServerConnected");
    });
};