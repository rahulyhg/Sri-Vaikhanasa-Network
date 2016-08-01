"use strict";

var mongoose = require("mongoose");
var Article = mongoose.model("Article");
var helpers = require("../helpers/resultHandlers");

/*
 * Create article
 */
exports.create = function(req, res, next) {
  var article = new Article(req.body);
  article.user = req.user;
  article
    .save()
    .then(helpers.handleResult(res, 201))
    .catch(helpers.handleError(next));
};

/**
 * Get article details
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var article = req.article ? req.article.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(article);
};

/**
 * Update an article
 */
exports.update = function(req, res, next) {
  var article = req.article;
  article.title = req.body.title;
  article.content = req.body.content;
  article.status = req.body.status;
  article.modifiedAt = new Date();
  article
    .save()
    .then(helpers.handleResult(res))
    .catch(helpers.handleError(next));
};

/**
 * Delete an article
 */
exports.delete = function(req, res, next) {
  var article = req.article;
  article
    .remove()
    .then(helpers.handleResult(res))
    .catch(helpers.handleError(next));
};

/**
 * Get list of Articles
 */
exports.list = function(req, res, next) {
  Article
    .find()
    .sort("-createdAt")
    .populate("user", "displayName")
    .exec()
    .then(helpers.handleResult(res))
    .catch(helpers.handleError(next));
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
  if (helpers.handleBadRequest(res, id)) {
    Article
      .findById(id)
      .populate("user", "displayName")
      .exec()
      .then(helpers.handleEntityNotFound(res))
      .then(function(entity) {
        if (entity) {
          req.article = entity; // Setting the article in current req context
          return next();
        }
      })
      .catch(helpers.handleError(next));
  }
};
