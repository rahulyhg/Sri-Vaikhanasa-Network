'use strict';

exports.login = function (api, expect, callback) {
    api
        .post('/api/user/authenticate')
        .send({
            "username": 'acharya.r',
            "password": 'password123'
        })
        .end(function (error, response) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(response.body.token).to.not.be.undefined;
            expect(response.body.token).to.not.be.null;
            if (callback) {
                callback(response.body.token);
            }
        });
}