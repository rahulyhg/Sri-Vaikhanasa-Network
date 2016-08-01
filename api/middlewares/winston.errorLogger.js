"use strict";

var winston = require("winston");
var expressWinston = require("express-winston");
var app = global.app;

app.use(expressWinston.errorLogger({
    transports: [
        new(winston.transports.File)({
            filename: app.get("LOG_FILE"),
            colorize: true
        })
    ],
    meta: false,
    msg: "req.id: {{req.id}}, req.method: {{req.method}}, req.url: {{req.url}}, res.statusCode: {{res.statusCode}}, res.responseTime: {{res.responseTime}}ms"
}));