"use strinct";

// module dependencies
var mongoose = require("mongoose"), Schema = mongoose.Schema;

// define schema
var UserSchema = new Schema(
    {        
        username: {
            type: String,
            unique: "Username already exists",
            required: "Please fill in a username",
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: "Please fill in a password"
        },
        modifiedAt: {
            type: Date,
            default: Date.now
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

// register with mongoose
mongoose.model("User", UserSchema);