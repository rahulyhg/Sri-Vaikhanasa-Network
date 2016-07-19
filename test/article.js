var expect = require("chai").expect;
var request = require('request');

describe("Articles module test", function () {

    var url = "http://localhost:3000/api/articles";
    var id = null;

    it("Create new article", function (done) {
        var options = {
            method: 'put',
            body: article = {
                "status": "Submitted",
                "content": "TestContent",
                "title": "TestTitle"
            },
            json: true,
            url: url
        };
        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            id = body._id;
            done(error);
        })
    });
    it("Get article by id after create", function (done) {
        var options = {
            method: 'get',
            json: true,
            url: url + "/" + id
        };
        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.title).to.equal("TestTitle");
            expect(body.content).to.equal("TestContent");
            done(error);
        });
    });
    it("Update article", function (done) {
        var options = {
            method: 'post',
            body: article = {
                "status": "Submitted",
                "content": "UpdatedTestContent",
                "title": "UpdatedTestTitle"
            },
            json: true,
            url: url + "/" + id
        };
        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done(error);
        })
    });
    it("Get article by id after update", function (done) {
        var options = {
            method: 'get',
            json: true,
            url: url + "/" + id
        };
        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.title).to.equal("UpdatedTestTitle");
            expect(body.content).to.equal("UpdatedTestContent");
            done(error);
        });
    });
    it("Delete article", function (done) {
        var options = {
            method: 'delete',
            url: url + "/" + id,
        };
        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done(error);
        })
    });
    it("Get article by id after delete", function (done) {
        var options = {
            method: 'get',
            json: true,
            url: url + "/" + id
        };
        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(404);
            done(error);
        });
    });
    it("Get all articles", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done(error);
        });
    });

});