
const mongoose = require('mongoose');


const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
    },
    
});

// 
// username : "khong rong" , "khong trung" 
// status : [active , inactive] 
// age : 1-150
// email : check email

module.exports = mongoose.model('Users', userSchema);