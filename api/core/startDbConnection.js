"use strict";

// Module dependencies
var mongoose = require("mongoose");

// making mongoose to use bluebird promises library
var Promise = require("bluebird");
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);

// winston logger
var winston = require("winston");
var app = global.app;

// connect database using mongoose framework
mongoose.connect(app.get("DB_CONN_URL"));
var db = mongoose.connection;

// on error through the error
db.on("error", function(err) {
    winston.error("Database connection error:" + err);
});
// on connect
db.once("open", function() {
    winston.info("Database connection established successfully....");
    app.emit("dbServerConnected");
});