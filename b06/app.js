var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

require('dotenv').config()
require("./src/apps/db/main.db")

var indexRouter = require('./src/routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);

app.use((req,res,next) => {
    next(createError(404))
})


app.use((error , req , res , next) => {
    console.log("status", error.status)
    console.log("error", error.message)


    // check mongdb error

    return res.status(error.status || 500).json({
        status: error.status || 500,
        message : error.message
    })
})

module.exports = app;
