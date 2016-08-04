"use strict";

var expect = global.expect;
var api = global.api;
var bearerToken = global.bearerToken;
var id = null;

describe("Articles API Test", function() {

    before(function(done) {
        api
            .get("/api/user/google/token")
            .set("access_token", bearerToken)
            .end(function(error, response) {
                expect(error).to.be.a.null;
                expect(response.statusCode).to.be.equal(200);
                done();
            });
    });

    it("Create without token", function(done) {
        api
            .put("/api/article")
            .send({
                "status": "Submitted",
                "content": "TestContent",
                "title": "TestTitle"
            })
            .end(function(error, response) {
                expect(response.statusCode).to.equal(401);
                done(error);
            });
    });

    it("Create with invalid token", function(done) {
        api
            .put("/api/article")
            .send({
                "status": "Submitted",
                "content": "TestContent",
                "title": "TestTitle"
            })
            .set("access_token", "1111111111111111111111111")
            .end(function(error, response) {
                expect(response.statusCode).to.equal(401);
                done(error);
            });
    });

    it("Create with valid token", function(done) {
        api
            .put("/api/article")
            .send({
                "status": "Submitted",
                "content": "TestContent",
                "title": "TestTitle"
            })
            .set("access_token", bearerToken)
            .end(function(error, response) {
                expect(response.statusCode).to.equal(201);
                id = response.body._id;
                done(error);
            });
    });

    it("Get article by id after create", function(done) {
        api
            .get("/api/article/" + id)
            .end(function(error, response) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.title).to.equal("TestTitle");
                expect(response.body.content).to.equal("TestContent");
                done(error);
            });
    });

    it("Create article with duplicate _id", function(done) {
        api
            .put("/api/article")
            .send({
                "_id": id,
                "status": "Submitted",
                "content": "TestContent",
                "title": "TestTitle"
            })
            .set("access_token", bearerToken)
            .end(function(error, response) {
                expect(response.statusCode).to.equal(500);
                done(error);
            });
    });

    it("Update article", function(done) {
        api
            .post("/api/article/" + id)
            .send({
                "_id": id,
                "status": "Submitted",
                "content": "UpdatedTestContent",
                "title": "UpdatedTestTitle"
            })
            .set("access_token", bearerToken)
            .end(function(error, response) {
                expect(response.statusCode).to.equal(200);
                done(error);
            });
    });

    it("Get article by id after update", function(done) {
        api
            .get("/api/article/" + id)
            .end(function(error, response) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.title).to.equal("UpdatedTestTitle");
                expect(response.body.content).to.equal("UpdatedTestContent");
                done(error);
            });
    });

    it("Update article with schema validation failure", function(done) {
        api
            .post("/api/article/" + id)
            .send({
                "_id": id
            })
            .set("access_token", bearerToken)
            .end(function(error, response) {
                expect(response.statusCode).to.equal(500);
                done(error);
            });
    });

    it("Delete article", function(done) {
        api
            .delete("/api/article/" + id)
            .set("access_token", bearerToken)
            .end(function(error, response) {
                expect(response.statusCode).to.equal(200);
                done(error);
            });
    });

    it("Get article by id after delete", function(done) {
        api
            .get("/api/article/" + id)
            .end(function(error, response) {
                expect(response.statusCode).to.equal(404);
                done(error);
            });
    });

    it("Get article by invalid id", function(done) {
        api
            .get("/api/article/@@@")
            .end(function(error, response) {
                expect(response.statusCode).to.equal(400);
                done(error);
            });
    });

    it("Get all articles", function(done) {
        api
            .get("/api/article")
            .end(function(error, response) {
                expect(response.statusCode).to.equal(200);
                done(error);
            });
    });
});
