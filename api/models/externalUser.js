"use strinct";

// module dependencies
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// define schema
var ExternalUserSchema = new Schema({
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
    profile: Object,
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});