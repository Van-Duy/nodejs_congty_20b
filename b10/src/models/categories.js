
const mongoose = require('mongoose');
const { Schema } = mongoose;


const categorySchema = new Schema({
    name : String,
    image : String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "active"
    },
    ordering : Number,
});


module.exports = mongoose.model('Categories', categorySchema);