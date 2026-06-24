
const mongoose = require('mongoose');
const { Schema } = mongoose;
var slugify = require('slugify')


const brandSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    slug : String,
    ordering : {
        type : Number,
        default: 0
    },
    isDelete : {
        type : Boolean,
        default : false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "active"
    },
});

brandSchema.pre("save" , function () {
    this.slug = slugify(this.name)
})



module.exports = mongoose.model('Brands', brandSchema);