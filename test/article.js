"use strict";

// get helper module
var helper = require("./helper");

module.exports = function (api, expect) {

    describe("Articles API Test", function () {

        var id = null;
        var authToken = null;

        before(function (done) {
            helper.login(api, expect, function (token) { authToken = token; done(); });
        });

        it("Create without token", function (done) {
            api
                .put("/api/article")
                .send({
                    "status": "Submitted",
                    "content": "TestContent",
                    "title": "TestTitle"
                })
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(401);
                    done(error);
                });
        });

        it("Create with invalid token", function (done) {
            api
                .put("/api/article")
                .send({
                    "status": "Submitted",
                    "content": "TestContent",
                    "title": "TestTitle"
                })
                .set("x-access-token", "invalid token")
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(401);
                    done(error);
                });
        });

        it("Create with valid token", function (done) {
            api
                .put("/api/article")
                .send({
                    "status": "Submitted",
                    "content": "TestContent",
                    "title": "TestTitle"
                })
                .set("x-access-token", authToken)
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(201);
                    id = response.body._id;
                    done(error);
                });
        });

        it("Get article by id after create", function (done) {
            api
                .get("/api/article/" + id)
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.title).to.equal("TestTitle");
                    expect(response.body.content).to.equal("TestContent");
                    done(error);
                });
        });

        it("Create article with duplicate _id", function (done) {
            api
                .put("/api/article")
                .send({
                    "_id": id,
                    "status": "Submitted",
                    "content": "TestContent",
                    "title": "TestTitle"
                })
                .set("x-access-token", authToken)
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(500);
                    done(error);
                });
        });

        it("Update article", function (done) {
            api
                .post("/api/article/" + id)
                .send({
                    "_id": id,
                    "status": "Submitted",
                    "content": "UpdatedTestContent",
                    "title": "UpdatedTestTitle"
                })
                .set("x-access-token", authToken)
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(200);
                    done(error);
                });
        });

        it("Get article by id after update", function (done) {
            api
                .get("/api/article/" + id)
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.title).to.equal("UpdatedTestTitle");
                    expect(response.body.content).to.equal("UpdatedTestContent");
                    done(error);
                });
        });

        it("Update article with schema validation failure", function (done) {
            api
                .post("/api/article/" + id)
                .send({
                    "_id": id
                })
                .set("x-access-token", authToken)
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(500);
                    done(error);
                });
        });

        it("Delete article", function (done) {
            api
                .delete("/api/article/" + id)
                .set("x-access-token", authToken)
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(200);
                    done(error);
                });
        });

        it("Get article by id after delete", function (done) {
            api
                .get("/api/article/" + id)
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(404);
                    done(error);
                });
        });

        it("Get article by invalid id", function (done) {
            api
                .get("/api/article/@@@")
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(400);
                    done(error);
                });
        });

        it("Get all articles", function (done) {
            api
                .get("/api/article")
                .end(function (error, response) {
                    expect(response.statusCode).to.equal(200);
                    done(error);
                });
        });
    });
};

