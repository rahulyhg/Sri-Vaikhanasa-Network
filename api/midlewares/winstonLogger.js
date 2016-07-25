"use strict";

var winston = require("winston");
var expressWinston = require("express-winston");

module.exports = function (app) {

    var fileName = "./api.log";

    app.use(expressWinston.logger({
        transports: [
            new (winston.transports.File)({
                filename: fileName,
                colorize: true,
                json: true
            })
        ],
        meta: false,
        msg: "HTTP {{req.method}} to URL:{{req.url}}"
    }));
    
};