"use strict";

// get helper module
var helper = require("./helper");

module.exports = function(api, expect) {

    describe("Authentication API Test", function() {
    
        it("Invalid username and password", function(done) {
            api
                .post("/api/user/authenticate")
                .send({
                    "username": "invalid",
                    "password": "invalid"
                })
                .end(function(error, response) {
                    expect(error).to.be.null;
                    expect(response.statusCode).to.equal(401);
                    done();
                });
        });
    
        it("Valid username and invalid pssword", function(done) {
            api
                .post("/api/user/authenticate")
                .send({
                    "username": "acharya.r",
                    "password": "invalid"
                })
                .end(function(error, response) {
                    expect(error).to.be.null;
                    expect(response.statusCode).to.equal(401);
                    done();
                });
        });
    
        it("Valid username and valid password", function(done) {
            helper.login(api, expect, function(token) {
                done();
            });
        });
    });

};