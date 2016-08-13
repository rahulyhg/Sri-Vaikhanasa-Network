"use strict";

// Module dependencies
var config = require("config");
var coalesce = require("coalescy");

var app = global.app;
var ENV_VAR = process.env;

app.set("HOST", coalesce(config.HOST, ENV_VAR.OPENSHIFT_NODEJS_IP, ENV_VAR.IP));
app.set("PORT", coalesce(config.PORT, ENV_VAR.OPENSHIFT_NODEJS_PORT, ENV_VAR.PORT));
app.set("DB_CONN_URL", coalesce(config.DB_CONN_URL, ENV_VAR.DB_CONN_URL));
app.set("GOOGLE_CLIENT_ID", coalesce(config.GOOGLE_CLIENT_ID, ENV_VAR.GOOGLE_CLIENT_ID));
app.set("GOOGLE_CLIENT_SECRET", coalesce(config.GOOGLE_CLIENT_SECRET, ENV_VAR.GOOGLE_CLIENT_SECRET));
app.set("LOG_FILE", coalesce(config.LOG_FILE, ENV_VAR.LOG_FILE));
app.set("GOOGLE_ACCESS_TOKEN", coalesce(config.GOOGLE_ACCESS_TOKEN, ENV_VAR.GOOGLE_ACCESS_TOKEN));
app.set("MAILGUN_KEY", coalesce(config.MAILGUN_KEY, ENV_VAR.MAILGUN_KEY));
app.set("RECAPTCHA_SECRET", coalesce(config.RECAPTCHA_SECRET, ENV_VAR.RECAPTCHA_SECRET));