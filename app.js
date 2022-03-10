var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var radarRouter = require('./routes/radar');
var ringsAndQuadrantsInfoRouter = require('./routes/rings-and-quadrants-info');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/radar', radarRouter);
app.use('/rings-and-quadrants-info', ringsAndQuadrantsInfoRouter);

module.exports = app;
