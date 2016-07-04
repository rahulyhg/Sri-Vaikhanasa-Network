'use strinct';

// module dependencies
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// define schema
var UserSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            default: '',
            required: 'Please fill in your first name'
        },
        lastName: {
            type: String,
            trim: true,
            default: '',
            required: 'Please fill in your last name'
        },
        displayName: {
            type: String,
            trim: true
        },
        username: {
            type: String,
            unique: 'Username already exists',
            required: 'Please fill in a username',
            lowercase: true,
            trim: true
        },
        updated: {
            type: Date
        },
        created: {
            type: Date,
            default: Date.now
        }        
    });

// register with mongoose
mongoose.model('User', UserSchema);