"use strict";

exports.getMe = function(req, res, next) {
    return res.json(req.user);
};