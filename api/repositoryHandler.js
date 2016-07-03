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
    this.connect = function (err) {
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
    this.findAll = function (err, collectionName, successCallback) {
        db.collection(collectionName, function (err, collection) {
            collection.find().toArray(function (err, result) {
                if (!err && successCallback) {
                    successCallback(result);
                }
            });
        });
    };

    // gets document by its id for the given collection
    this.findById = function (err, collectionName, id, successCallback) {
        var _id = new mongo.ObjectID(id);
        db.collection(collectionName, function (err, collection) {
            collection.findOne({ '_id': _id }, function (err, result) {
                if (!err && successCallback) {
                    successCallback(result);
                }
            });
        });
    };

    // adds new document to given collection
    this.add = function (err, collectionName, document, successCallback) {
        db.collection(collectionName, function (err, collection) {
            collection.insertOne(document, { safe: true }, function (err, result) {
                if (!err && successCallback) {
                    successCallback(result);
                }
            });
        });
    };

    // updates document by its id in given collection
    this.update = function (err, collectionName, id, document, successCallback) {
        var _id = new mongo.ObjectID(id);
        db.collection(collectionName, function (err, collection) {
            collection.update({ '_id': _id }, document, { safe: true }, function (err, result) {
                if (!err && successCallback) {
                    successCallback(result);
                }
            });
        });
    };

    // deletes document by its id from given collection
    this.remove = function (err, collectionName, id, errorCallback, successCallback) {
        var _id = new mongo.ObjectID(id);
        db.collection(collectionName, function (err, collection) {
            collection.remove({ '_id': _id }, { safe: true }, function (err, result) {
                if (!err && successCallback) {
                    successCallback(result);
                }
            });
        });
    };

    return this;
}