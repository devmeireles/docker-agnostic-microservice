var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var productRouter = require('./routes/products');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', productRouter);

app.listen(3002, () => {
    console.log('Product service working');
});