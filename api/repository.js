'use strict';
/*
generic repository module to perform basic db operations
*/

// include required external modules
var config = require('config');
var mongo = require('mongodb');

// holds mongo db connection object
var db = null;

// connects mongo db with configured url
exports.connect = function () {
    if (db == null) {
        mongo.MongoClient.connect(
            config.dbServer.url,
            function (err, dbInstance) {
                console.log('connected to mongo db....');
                db = dbInstance;
            });
    }
};

// get all documents for the given collection
exports.findAll = function (collectionName, errorCallback, successCallback) {
    db.collection(collectionName, function (err, collection) {
        handleErrorIfAny(err, errorCallback);
        collection.find().toArray(function (err, items) {
            handleErrorIfAny(err, errorCallback);
            if (successCallback) {
                successCallback(items);
            }
        });
    });
};

// gets document by its id for the given collection
exports.findById = function (collectionName, id, errorCallback, successCallback) {
    var _id = new mongo.ObjectID(id);
    db.collection(collectionName, function (err, collection) {
        handleErrorIfAny(err, errorCallback);
        collection.findOne({ '_id': _id }, function (err, item) {
            handleErrorIfAny(err, errorCallback);
            if(successCallback)
            {               
                successCallback(item);;
            }
        });
    });
};

// adds new document to given collection
exports.add = function (collectionName, document, errorCallback, successCallback) {
    db.collection(collectionName, function (err, collection) {
        handleErrorIfAny(err, errorCallback);
        collection.insertOne(document, { safe: true }, function (err, result) {
            handleErrorIfAny(err, errorCallback);
            if(successCallback)
            {               
                successCallback(result);;
            }
        });
    });
};

// updates document by its id in given collection
exports.update = function (collectionName, id, document, errorCallback, successCallback) {
    var _id = new mongo.ObjectID(id);
    db.collection(collectionName, function (err, collection) {
        handleErrorIfAny(err, errorCallback);
        collection.update({ '_id': _id }, document, { safe: true }, function (err, result) {
            handleErrorIfAny(err, errorCallback);
            if(successCallback)
            {               
                successCallback(result);;
            }
        });
    });
};

// deletes document by its id from given collection
exports.remove = function (collectionName, id, errorCallback, successCallback) {
    var _id = new mongo.ObjectID(id);
    db.collection(collectionName, function (err, collection) {
        handleErrorIfAny(err, errorCallback);
        collection.remove({ '_id': _id }, { safe: true }, function (err, result) {
            handleErrorIfAny(err, errorCallback);
            if(successCallback)
            {               
                successCallback(result);;
            }
        });
    });
};

function handleErrorIfAny(err, errorCallback)
{
    if (err) {
        if (errorCallback) {
            errorCallback(err);
        }
    }
}