"use strinct";

// module dependencies
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var options = {
    timestamps: true
};

// define schema
var UserSchema = new Schema({
    provider: String,
    providerId: String,
    email: {
        type: String,
        unique: "Email already registered",
        required: "Email ID is required",
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: "Please fill in a username",
        trim: true
    },
    token: {
        type: String
    },
    profile: Object
}, options);

// register with mongoose
mongoose.model("User", UserSchema);