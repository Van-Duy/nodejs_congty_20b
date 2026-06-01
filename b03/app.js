var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
require("./src/apps/db/main.db")


// async function main() {
//     try {
//         await mongoose.connect(`mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@nanciroom.toxdaao.mongodb.net/`);
//         console.log("mongodb connect success")
//     } catch (error) {
//         console.log("mongodb error")
//     }
// }

// main()


var indexRouter = require('./src/routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);

module.exports = app;
