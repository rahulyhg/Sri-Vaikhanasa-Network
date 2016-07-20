'use strinct';

// module dependencies
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// define schema
var ArticleSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now
        },
        modifiedAt: {
            type: Date,
            default: Date.now
        },
        title: {
            type: String,
            default: '',
            trim: true,
            required: 'Title cannot be blank'
        },
        content: {
            type: String,
            default: '',
            trim: true
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['Draft', 'Submitted', 'Approved', 'Deleted'],
            default: 'Draft'
        }
    });

// register with mongoose
mongoose.model('Article', ArticleSchema);