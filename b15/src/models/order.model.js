
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    price : Number,
    quantity : Number
});

const orderSchema = new Schema({
    code : String,
    id_user :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    address : String,
    phone : String,
    items : [orderItemSchema],
    total : Number,
    status : {
        type : String,
        enum: ["pending" , "confirm" , "shipping" , "completed" , "cancelled"],
        default : "pending"
    },
}, {
    timestamps : true
});

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