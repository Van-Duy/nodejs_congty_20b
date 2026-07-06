// import { v2 as cloudinary } from 'cloudinary';
const { v2: cloudinary } = require("cloudinary")


cloudinary.config({
    cloud_name: 'dmc9wn3if',
    api_key: '912963968544784',
    api_secret: process.env.api_secret_cloudinary 
});



module.exports = cloudinary