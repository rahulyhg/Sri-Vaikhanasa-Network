'use strict';
/*
generic service module to perform basic service operations
*/

module.exports = function svnApiServicesHandler(collectionName, db) {

    // calls the repository to get all documents from given collection and returns as api response
    this.findAll = function (req, res) {
        var err = null;
        db.findAll(err, collectionName, function (result) { res.send(result); });
    };

    // calls the repository to get document by its id from given collection and returns as api response
    this.findById = function (req, res) {
        var id = req.params.id, err = null;
        db.findById(err, collectionName, id, function (result) { res.send(result); });
    };

    // calls the repository to add new document to given collection and returns as api response
    this.add = function (req, res) {
        var article = req.body, err = null;
        db.add(err, collectionName, article, function (result) { res.send(result); });
    };

    // calls the repository to update document by its id from given collection and returns as api response
    this.update = function (req, res) {
        var id = req.params.id, err = null, article = req.body;
        db.update(err, collectionName, id, article, function (result) { res.send(result); });
    };

    // calls the repository to delete document by its id from given collection and returns as api response
    this.remove = function (req, res) {
        var id = req.params.id, err = null;
        db.remove(err, collectionName, id, function (result) { res.send(result); });
    };

    return this;
}