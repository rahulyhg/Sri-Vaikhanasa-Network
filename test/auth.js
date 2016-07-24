'use strict';

module.exports = function (app) {

    var api = null;
    var expect = require("chai").expect;

    before(function (done) {
        api = supertest(app);
        done();
    });

    describe("Authentication API Test", function () {

        it("Invalid username and password", function (done) {
            api
                .post('/api/user/authenticate')
                .send({
                    "username": 'invalid',
                    "password": 'invalid'
                })
                .end(function (error, response) {
                    expect(error).to.be.null;
                    expect(response.statusCode).to.equal(401);
                    done();
                });
        });

        it("Valid username and invalid pssword", function (done) {
            api
                .post('/api/user/authenticate')
                .send({
                    "username": 'acharya.r',
                    "password": 'invalid'
                })
                .end(function (error, response) {
                    expect(error).to.be.null;
                    expect(response.statusCode).to.equal(401);
                    done();
                });
        });

        // it("Valid username and valid password", function (done) {
        //     require('./helper').login(api, expect, function (token) { done(); });
        // });
    });
};