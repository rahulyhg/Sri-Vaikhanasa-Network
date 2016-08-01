"use strinct";

// module dependencies
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var options = {
    timestamps: true
};

// define schema
var ArticleSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Title cannot be blank"
    },
    content: {
        type: String,
        trim: true
    },
    // user: {
    //     type: Schema.ObjectId,
    //     ref: "User"
    // },
    status: {
        type: String,
        enum: ["Draft", "Submitted", "Approved", "Deleted"],
        default: "Draft"
    }
}, options);

// register with mongoose
mongoose.model("Article", ArticleSchema);