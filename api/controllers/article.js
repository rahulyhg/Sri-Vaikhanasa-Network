"use strict";

var mongoose = require("mongoose");
var Article = mongoose.model("Article");

var handleBadRequest = function (res, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send("Invalid ID");
    return false;
  }
  return true;
};
var handleEntityNotFound = function (res) {
  return function (result) {
    if (!result) {
      res.status(404).send("Resource not found...");
    }
    return result;
  };
};
var responseWithResult = function (res, statusCode) {
  return function (result) {
    if (result) {
      statusCode = statusCode || 200;
      res.status(statusCode).json(result);
    }
  };
};
var handleError = function (next) {
  return function (error) {
    if (error) {
      return next(error);
    }
  };
};

/*
* Create article
*/
exports.create = function (req, res, next) {
  var article = new Article(req.body);
  article.user = req.user;
  article
    .save()
    .then(responseWithResult(res, 201))
    .catch(handleError(next));
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
    .then(responseWithResult(res))
    .catch(handleError(next));
};

/**
 * Delete an article
 */
exports.delete = function (req, res, next) {
  var article = req.article;
  article
    .remove()
    .then(responseWithResult(res))
    .catch(handleError(next));
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
    .then(responseWithResult(res))
    .catch(handleError(next));
};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {
  if (handleBadRequest(res, id)) {
    Article
      .findById(id)
      .populate("user", "username")
      .exec()
      .then(handleEntityNotFound(res))
      .then(function (entity) { if (entity) { req.article = entity; return next(); } }) // Setting the article in current req context
      .catch(handleError(next));
  }
};
