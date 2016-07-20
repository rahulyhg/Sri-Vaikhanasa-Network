var expect = require("chai").expect;
var request = require('request');

describe("Articles module test", function () {

    var url = "http://localhost:3000/api/article";
    var id = null;
    var token = null;
    var username = 'acharya.r';
    var password = 'password123';

    it("Create new article without login", function (done) {
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
            expect(response.statusCode).to.equal(403);
            done(error);
        })
    });

    it('Login', function (done) {
        var options = {
            method: 'post',
            body: {
                "username": username,
                "password": password
            },
            json: true,
            url: 'http://localhost:3000/api/user/authenticate'
        };
        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            token = body.token;
            done(error);
        })
    })

    it("Create new article after login", function (done) {
        var options = {
            method: 'put',
            body: article = {
                "status": "Submitted",
                "content": "TestContent",
                "title": "TestTitle"
            },
            headers: {
                "x-access-token": token
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


// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "http://localhost:3000/api/article/",
//   "method": "PUT",
//   "headers": {
//     "content-type": "application/json",
//     "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFjaGFyeWEuciIsInBhc3N3b3JkIjoicGFzc3dvcmQxMjMiLCJpYXQiOjE0NjkwMzcyOTUsImV4cCI6MTQ2OTAzNzU5NX0.zcUfSFCUXRrJsmFJ5KCQR38aHac04u2utOXsyo2ZJ7E",
//     "cache-control": "no-cache",
//     "postman-token": "7cba809f-b850-b961-4966-394f23694721"
//   },
//   "processData": false,
//   "data": "{\n    \"status\": \"Submitted\",\n    \"content\": \"\",\n    \"title\": \"lllllllllllllllllll\",\n    \"modifiedAt\": \"2016-07-04T18:20:32.133Z\",\n    \"createdAt\": \"2016-07-04T18:19:40.880Z\"\n  }"
// }

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });