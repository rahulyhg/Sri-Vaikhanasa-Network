"use strinct";

// module dependencies
var mongoose = require("mongoose"), Schema = mongoose.Schema;

// define schema
var ErrorSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now
        },
        requestUrl: {
            type: String,
            trim: true
        },
        httpMethod: {
            type: String,
            trim: true
        },
        error: {
            type: String,
            trim: true
        },
        stackTrace: {
            type: String,
            trim: true
        },
        user: {
            type: Schema.ObjectId,
            ref: "User"
        },
        clientIP:{
            type: String,
            trim: true
        }
    });

// register with mongoose
mongoose.model("Error", ErrorSchema);