"use strict";

var mongoose = require("mongoose");

global.handleBadRequest = function (res, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send("Invalid ID");
    return false;
  }
  return true;
};
global.handleEntityNotFound = function (res) {
  return function (result) {
    if (!result) {
      res.status(404).send("Resource not found...");
    }
    return result;
  };
};
global.responseWithResult = function (res, statusCode) {
  return function (result) {
    if (result) {
      statusCode = statusCode || 200;
      res.status(statusCode).json(result);
    }
  };
};
global.handleError = function (next) {
  return function (error) {
    if (error) {
      return next(error);
    }
  };
};

