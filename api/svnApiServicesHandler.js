'use strict';
/*
generic service module to perform basic service operations
*/

module.exports = function svnApiServicesHandler(collectionName, db) {

    // calls the repository to get all documents from given collection and returns as api response
    this.findAll = function (req, res) {
        db.findAll
            (
            collectionName,
            function (err) { res.send(err); },
            function (result) { res.send(result); }
            );
    };

    // calls the repository to get document by its id from given collection and returns as api response
    this.findById = function (req, res) {
        var id = req.params.id;
        db.findById(
            collectionName,
            id,
            function (err) { res.send(err); },
            function (result) { res.send(result); }
        )
    };

    // calls the repository to add new document to given collection and returns as api response
    this.add = function (req, res) {
        var article = req.body;
        db.add(
            collectionName,
            article,
            function (err) { res.send(err); },
            function (result) { res.send(result); }
        )
    };

    // calls the repository to update document by its id from given collection and returns as api response
    this.update = function (req, res) {
        var id = req.params.id;
        var article = req.body;
        db.update(
            collectionName,
            id,
            article,
            function (err) { res.send(err); },
            function (result) { res.send(result); }
        )
    };

    // calls the repository to delete document by its id from given collection and returns as api response
    this.remove = function (req, res) {
        var id = req.params.id;
        db.remove(
            collectionName,
            id,
            function (err) { res.send(err); },
            function (result) { res.send(result); }
        )
    };

    return this;
}