'use strict';

// Module dependencies
var config = require('config');
var mongoose = require('mongoose');

// making mongoose to use bluebird promises library
mongoose.Promise = require('bluebird');

// connect database using mongoose framework
mongoose.connect(process.env.SVNDB_URL || config.dbServer.url);
var db = mongoose.connection;

// on error through the error
db.on('error', console.error.bind(console, 'Database connection error:'));
// on connect
db.once('open', function () {
    console.log('Database connection established successfully....');
});