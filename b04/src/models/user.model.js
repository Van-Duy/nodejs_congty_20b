
const mongoose = require('mongoose');


const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
    }
});



module.exports = mongoose.model('Users', userSchema);