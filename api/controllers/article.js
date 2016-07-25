"use strict";

var mongoose = require("mongoose");
var Article = mongoose.model("Article");

var responde = function (err, data, req, res, next) {
  if (err) {
    return next(err);
  } else {
    res.json(data);
  }
};

/*
* Create article
*/
exports.create = function (req, res, next) {
  var article = new Article(req.body);
  article.user = req.user;
  article.save(function (err, data) { responde(err, data, req, res, next); });
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
  article.save(function (err, data) { responde(err, data, req, res, next); });
};

/**
 * Delete an article
 */
exports.delete = function (req, res, next) {
  var article = req.article;
  article.remove(function (err, data) { responde(err, data, req, res, next); });
};

/**
 * Get list of Articles
 */
exports.list = function (req, res, next) {
  Article.find().sort("-createdAt").populate("user", "displayName")
    .exec(function (err, data) { responde(err, data, req, res, next); });
};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Article is invalid"
    });
  }

  Article.findById(id).populate("user", "username").exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: "No article with that identifier has been found"
      });
    }
    req.article = article;
    next();
  });

};
