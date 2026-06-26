
const mongoose = require('mongoose');
const { Schema } = mongoose;
var slugify = require('slugify')


const productSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    slug : String,
    avatar : {
        type: String,
        default: ""
    },
    images : {
        type : Array,
        default : []
    },
    description : String,
    ordering : {
        type : Number,
        default: 0
    },
    id_category :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    },
    id_brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brands"
    },
    price: {
        type: Number,
        default: "0"
    },
    price_sale : {
        type : Number,
        default: "0"
    },
    is_top_deal : {
        type: Boolean,
        default : false
    },
    is_hot : {
        type: Boolean,
        default : false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "active"
    },
    isDelete : {
        type : Boolean,
        default : false
    },
    
}, {
    timestamps : true
});

productSchema.pre("save" , function () {
    this.slug = slugify(this.name)
})



module.exports = mongoose.model('Products', productSchema);