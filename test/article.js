var expect = require("chai").expect;
var app = require('../server');
var supertest = require('supertest');
var api = supertest(app);

before(function (done) {
    app.on("appServerStarted", function () {
        app.on("dbServerConnected", function () {
            done();
        });
    });
});

describe("Articles API Test", function () {

    var id = null;
    var token = null;
    var login = {
        "username": 'acharya.r',
        "password": 'password123'
    };
    var newArticle = {
        "status": "Submitted",
        "content": "TestContent",
        "title": "TestTitle"
    };
    var updatedArticle = {
        "_id": id,
        "status": "Submitted",
        "content": "UpdatedTestContent",
        "title": "UpdatedTestTitle"
    };

    it("Create before login", function (done) {
        api
            .put('/api/article')
            .send(newArticle)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(403);
                done(error);
            });
    });

    it("Create before login with invalid token", function (done) {
        api
            .put('/api/article')
            .send(newArticle)
            .set('x-access-token', 'invalid token')
            .end(function (error, response) {
                expect(response.statusCode).to.equal(403);
                done(error);
            });
    });

    it("Invalid login", function (done) {
        api
            .post('/api/user/authenticate')
            .send({ 'usename': 'invalid', 'password': 'invalid' })
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                token = response.body.token;
                done(error);
            });
    });

    it("Invalid login password", function (done) {
        api
            .post('/api/user/authenticate')
            .send({ 'usename': 'acharya.r', 'password': 'invalid' })
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                token = response.body.token;
                done(error);
            });
    });

    it("Login", function (done) {
        api
            .post('/api/user/authenticate')
            .send(login)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                token = response.body.token;
                done(error);
            });
    });

    it("Create after login", function (done) {
        api
            .put('/api/article')
            .send(newArticle)
            .set('x-access-token', token)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                id = response.body._id;
                done(error);
            });
    });

    it("Get article by id after create", function (done) {
        api
            .get('/api/article/' + id)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.title).to.equal("TestTitle");
                expect(response.body.content).to.equal("TestContent");
                done(error);
            });
    });

    it("Create duplicate article", function (done) {
        api
            .put('/api/article')
            .send({
                "_id": id,
                "status": "Submitted",
                "content": "UpdatedTestContent",
                "title": "UpdatedTestTitle"
            })
            .set('x-access-token', token)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(500);
                done(error);
            });
    });

    it("Update article", function (done) {
        api
            .post('/api/article/' + id)
            .send(updatedArticle)
            .set('x-access-token', token)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                done(error);
            });
    });

    it("Get article by id after update", function (done) {
        api
            .get('/api/article/' + id)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                expect(response.body.title).to.equal("UpdatedTestTitle");
                expect(response.body.content).to.equal("UpdatedTestContent");
                done(error);
            });
    });

    it("Update article with schema validation failure", function (done) {
        api
            .post('/api/article/' + id)
            .send({
                "_id": id
            })
            .set('x-access-token', token)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(500);
                done(error);
            });
    });

    it("Delete article", function (done) {
        api
            .delete('/api/article/' + id)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                done(error);
            });
    });

    it("Get article by id after delete", function (done) {
        api
            .get('/api/article/' + id)
            .end(function (error, response) {
                expect(response.statusCode).to.equal(404);
                done(error);
            });
    });

    it("Get all articles", function (done) {
        api
            .get('/api/article')
            .end(function (error, response) {
                expect(response.statusCode).to.equal(200);
                done(error);
            });
    });
});