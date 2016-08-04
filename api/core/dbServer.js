"use strict";

module.exports = function(mongoose, dbUrl, bluebirdPromise, winston, done) {
    this.connect = function() {
        // making mongoose to use bluebird promises library
        mongoose.Promise = bluebirdPromise;
        bluebirdPromise.promisifyAll(mongoose);

        // connect database using mongoose framework
        mongoose.connect(dbUrl);
        var db = mongoose.connection;

        // on error thow the error
        db.on("error", function(err) {
            winston.error("Database connection error:" + err);
            done(err);
        });

        // on connect
        db.once("open", function() {
            winston.info("Database connection established successfully....");
            done();
        });
    };
};