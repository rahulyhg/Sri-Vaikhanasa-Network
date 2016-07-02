'use strict';
/*
generic service module to perform basic service operations
*/

// include required internal modules
var db = require('./repository');

// holds mongo db collection name
var collectionName = null;

// calls repository to initialize db
exports.init = function() {
    db.connect();  
};

// set the current collection name of the service instance and returns the same
exports.GetServiceInstance = function(collection)
{
    collectionName = collection;    
    return this;
};

// calls the repository to get all documents from given collection and returns as api response
exports.findAll = function (req, res) {
    db.findAll
    (
        collectionName,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    );
};

// calls the repository to get document by its id from given collection and returns as api response
exports.findById = function (req, res) {
    var id = req.params.id;
    db.findById(
        collectionName,
        id,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    )
};

// calls the repository to add new document to given collection and returns as api response
exports.add = function (req, res) {
    var article = req.body;
    db.add(
        collectionName,
        article,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    )
};

// calls the repository to update document by its id from given collection and returns as api response
exports.update = function (req, res) {
    var id = req.params.id;
    var article = req.body;
    db.update(
        collectionName,
        id,
        article,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    )
};

// calls the repository to delete document by its id from given collection and returns as api response
exports.remove = function (req, res) {
    var id = req.params.id;
    db.remove(
        collectionName,
        id,
        function(err) { res.send(err); }, 
        function(result) { res.send(result); }
    )
};