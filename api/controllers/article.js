"use strict";

var mongoose = require("mongoose");
var Article = mongoose.model("Article");

/*
* Create article
*/
exports.create = function (req, res, next) {
  var article = new Article(req.body);
  article.user = req.user;
  article
    .save()
    .then(global.responseWithResult(res, 201))
    .catch(global.handleError(next));
};

/**
 * Get article details
 */
exports.read = function (req, res) {
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
exports.update = function (req, res, next) {
  var article = req.article;
  article.title = req.body.title;
  article.content = req.body.content;
  article.status = req.body.status;
  article.modifiedAt = new Date();
  article
    .save()
    .then(global.responseWithResult(res))
    .catch(global.handleError(next));
};

/**
 * Delete an article
 */
exports.delete = function (req, res, next) {
  var article = req.article;
  article
    .remove()
    .then(global.responseWithResult(res))
    .catch(global.handleError(next));
};

/**
 * Get list of Articles
 */
exports.list = function (req, res, next) {
  Article
    .find()
    .sort("-createdAt")
    .populate("user", "displayName")
    .exec()
    .then(global.responseWithResult(res))
    .catch(global.handleError(next));
};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {
  if (global.handleBadRequest(res, id)) {
    Article
      .findById(id)
      .populate("user", "username")
      .exec()
      .then(global.handleEntityNotFound(res))
      .then(function (entity) { if (entity) { req.article = entity; return next(); } }) // Setting the article in current req context
      .catch(global.handleError(next));
  }
};
