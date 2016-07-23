'use strict';

// Module dependencies
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Authenticates user by given userName and password
exports.authenticate = function (req, res, next) {
    User.findOne(
        { username: req.body.username },
        function (err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            }
            else {
                if (user.password != req.body.password) {
                    return res.status(401).send({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }
                else {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user, req.app.get('tokenPrivateKey'), {
                        expiresIn: req.app.get('tokenExpiresIn')
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Authenticated successfully...',
                        token: token
                    });
                }
            }
        });
};