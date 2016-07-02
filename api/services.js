'use strict';

var dbHelper = require('./repository');
var collectionName = null;

exports.init = function() {
    dbHelper.connectToDb();  
};

exports.GetServiceInstance = function(collection)
{
    collectionName = collection;    
    return this;
};

exports.findAll = function (req, res) {
    dbHelper.findAll
    (
        collectionName,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    );
};

exports.findById = function (req, res) {
    var id = req.params.id;
    dbHelper.findById(
        collectionName,
        id,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    )
};

exports.add = function (req, res) {
    var article = req.body;
    dbHelper.add(
        collectionName,
        article,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    )
};

exports.update = function (req, res) {
    var id = req.params.id;
    var article = req.body;
    dbHelper.update(
        collectionName,
        id,
        article,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    )
};

exports.remove = function (req, res) {
    var id = req.params.id;
    dbHelper.remove(
        collectionName,
        id,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    )
};