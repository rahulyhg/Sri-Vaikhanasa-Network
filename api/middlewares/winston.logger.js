"use strict";

var winston = require("winston");
var expressWinston = require("express-winston");

var app = global.app;
app.use(expressWinston.logger({
    transports: [
        new(winston.transports.File)({
            filename: app.get("LOG_FILE"),
            colorize: true,
            json: true
        })
    ],
    meta: false,
    msg: "HTTP {{req.method}} to URL:{{req.url}}"
}));