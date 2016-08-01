"use strict";

var passport = require("passport");
var ensureAuthenticated = require("../middlewares/ensureAuthenticated");
var userApi = require("../controllers/userApi");
var app = global.app;

app.get('/api/user/google/token', ensureAuthenticated, userApi.getMe);
