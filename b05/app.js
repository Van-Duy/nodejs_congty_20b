var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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


app.use((error , req , res , next) => {
    console.log("error", error.message)
    return res.status(500).json({
        message : error.message
    })
})

module.exports = app;
