"use strict";

var expect = global.expect;
var api = global.api;
var bearerToken = global.bearerToken;

describe("Google OAuth Test", function() {
    
    it("is Authenticated without access token", function(done) {
        api
            .get("/api/user/google/token")
            .end(function(error, response) {
                expect(error).to.be.a.null;
                expect(response.statusCode).to.be.equal(401);
                done();
            });
    });

    it("is Authenticated with wrong access token", function(done) {
        api
            .get("/api/user/google/token?access_token=11111")
            .end(function(error, response) {
                expect(error).to.be.a.null;
                expect(response.statusCode).to.be.equal(401);
                done();
            });
    });

    it("is Authenticated with access token in query string", function(done) {
        api
            .get("/api/user/google/token?access_token=" + bearerToken)
            .end(function(error, response) {
                expect(error).to.be.a.null;
                expect(response.statusCode).to.be.equal(200);
                done();
            });
    });

    it("is Authenticated with access token in request header", function(done) {
        api
            .get("/api/user/google/token")
            .set("access_token", bearerToken)
            .end(function(error, response) {
                expect(error).to.be.a.null;
                expect(response.statusCode).to.be.equal(200);
                done();
            });
    });
});