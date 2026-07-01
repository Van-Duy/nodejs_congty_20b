
const mongoose = require('mongoose');
const { Schema } = mongoose;
var slugify = require('slugify')


const orderItemSchema = new Schema({
    id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    price : Number,
    quantity : Number
});

const orderSchema = new Schema({
    id_user :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    address : String,
    phone : String,
    items : [orderItemSchema],
    total : Number,
    status : {
        enum : ["pending" , "confirm" , "shipping" , "completed" , "cancelled"],
        default : "pending"
    },
    code : String
    
}, {
    timestamps : true
});

orderSchema.pre("save" , function () {
    this.slug = slugify(this.name)
})


/* 
{
    id_user : 1
    items : [
        {
            id_product : 6a3e96fadce80720107de0bd,
            price : 100,
            quantity : 1,
        },
        {
            id_product : 6a3e96fadce80720107de0bd,
            price : 100,
            quantity : 1,
        }
    ]

}


*/






module.exports = mongoose.model('Order', orderSchema);