var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

require('dotenv').config()
require("./src/apps/db/main.db")

var indexRouter = require('./src/routes/index');
const { default: mongoose } = require('mongoose');

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
    if (error instanceof mongoose.Error.ValidationError) {
        const e = {};
        for (const field in error.errors) {
            e[field] = error.errors[field].message;
        }
        return res.status(400).json({
            status: 400,
            message: e,
        })
    }
    return res.status(error.status || 500).json({
        status: error.status || 500,
        message : error.message
    })
})

module.exports = app;

