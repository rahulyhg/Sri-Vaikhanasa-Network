"use strict";

var addRequestId = require("express-request-id")();
var app = global.app;

app.use(addRequestId);