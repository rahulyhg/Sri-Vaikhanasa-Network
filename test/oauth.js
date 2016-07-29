"use strict";

// Dependency modules
var WalkingDead = require("walking-dead");
var cobbler = require("cobbler");

module.exports = function(api, expect) {

    describe("Google OAuth Test", function() {
        var url = "https://sri-vaikhanasa-network-acharyarajasekhar.c9users.io/auth/google";
        var zopts = {
            debug: false,
            silent: false
        };
        var googleProfile = {
            "provider": "google",
            "id": "111111111111111111111",
            "displayName": "Abc",
            "email": "abc@abc.com"
        };

        it("Mocked google oauth login", function(done) {
            var GoogleStrategy = require("passport-google-oauth2").Strategy;
            var passport = cobbler(GoogleStrategy, googleProfile, {
                callbackURL: "/oauth2callback"
            });
            new WalkingDead(url).zombify(zopts);
            api
                .get("/auth/google")
                .end(function(error, response) {
                    expect(error).to.be.a.null;
                    expect(response.statusCode).to.equal(302);
                    expect(response.headers.location).to.contain("/oauth2callback?code=12345");
                    api
                        .get("/oauth2callback?code=12345")
                        .end(function(error, response) {
                            expect(error).to.be.a.null;
                            expect(response.statusCode).to.equal(302);
                            expect(response.headers.location).to.contain("/auth/google/success");
                            api
                                .get(response.headers.location)
                                .end(function(error, response) {
                                    expect(error).to.be.a.null;
                                    expect(response.statusCode).to.equal(200);
                                    done(error);
                                });
                        });
                });
        });

        // it("is Authenticated with Google", function(done) {
        //     api
        //         .get("/api/user/isAuthenticated")
        //         .end(function(error, response) {
        //             expect(error).to.be.a.null;
        //             expect(response.statusCode).to.be.equal(200);
        //             done(error);
        //         });
        // });
    });

};