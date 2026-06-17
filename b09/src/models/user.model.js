
const mongoose = require('mongoose');


const { Schema } = mongoose;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role : {
        type: String,
        num: ['admin', 'user'],
        default: "user"
    },
    password : {
        type: String,
        required: true
    },
    status : {
        type: String,
        enum: ['active', 'inactive'],
        default: "active"
    },
    age : {
        type : Number,
        min: [1, 'Too small'],
        max: 100,
        default : 1
    },
    code : String,
    code_time : Date
});


module.exports = mongoose.model('Users', userSchema);