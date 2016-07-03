'use strict';
/*
generic repository module to perform basic db operations
*/
module.exports = function repositoryHandler() {
    // include required external modules
    var config = require('config');
    var mongo = require('mongodb');

    // holds mongo db connection object
    var db = null;

    // connects mongo db with configured url
    this.connect = function () {
        if (db == null) {
            mongo.MongoClient.connect(
                process.env.SVNDB_URL || config.dbServer.url,
                function (err, dbInstance) {
                    console.log('connected to mongo db....');
                    db = dbInstance;
                });
        }
    };

    // get all documents for the given collection
    this.findAll = function (collectionName, errorCallback, successCallback) {
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
    this.findById = function (collectionName, id, errorCallback, successCallback) {
        var _id = new mongo.ObjectID(id);
        db.collection(collectionName, function (err, collection) {
            handleErrorIfAny(err, errorCallback);
            collection.findOne({ '_id': _id }, function (err, item) {
                handleErrorIfAny(err, errorCallback);
                if (successCallback) {
                    successCallback(item);;
                }
            });
        });
    };

    // adds new document to given collection
    this.add = function (collectionName, document, errorCallback, successCallback) {
        db.collection(collectionName, function (err, collection) {
            handleErrorIfAny(err, errorCallback);
            collection.insertOne(document, { safe: true }, function (err, result) {
                handleErrorIfAny(err, errorCallback);
                if (successCallback) {
                    successCallback(result);;
                }
            });
        });
    };

    // updates document by its id in given collection
    this.update = function (collectionName, id, document, errorCallback, successCallback) {
        var _id = new mongo.ObjectID(id);
        db.collection(collectionName, function (err, collection) {
            handleErrorIfAny(err, errorCallback);
            collection.update({ '_id': _id }, document, { safe: true }, function (err, result) {
                handleErrorIfAny(err, errorCallback);
                if (successCallback) {
                    successCallback(result);;
                }
            });
        });
    };

    // deletes document by its id from given collection
    this.remove = function (collectionName, id, errorCallback, successCallback) {
        var _id = new mongo.ObjectID(id);
        db.collection(collectionName, function (err, collection) {
            handleErrorIfAny(err, errorCallback);
            collection.remove({ '_id': _id }, { safe: true }, function (err, result) {
                handleErrorIfAny(err, errorCallback);
                if (successCallback) {
                    successCallback(result);;
                }
            });
        });
    };

    var handleErrorIfAny = function (err, errorCallback) {
        if (err) {
            if (errorCallback) {
                errorCallback(err);
            }
        }
    }

    return this;
}