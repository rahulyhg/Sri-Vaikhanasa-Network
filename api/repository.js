'use strict';

var config = require('config');
var assert = require('assert');
var mongo = require('mongodb');
var ObjectId = mongo.ObjectID;
var mongoClient = mongo.MongoClient;
var db = null;

exports.connectToDb = function () {
    if (db == null) {
        mongoClient.connect(
            config.dbServer.url,
            function (err, dbInstance) {
                assert.equal(null, err);
                console.log('connected to mongo db....');
                db = dbInstance;
            });
    }
};

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