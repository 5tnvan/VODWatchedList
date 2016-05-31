/*-- VARIABLES --*/
//middleware
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbSeeder = require('./dbSeeder');

var app = express();
var dbURI = 'mongodb://van:123@ds021010.mlab.com:21010/voddb';

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

/*-- SEED AND CONNECT TO DB --*/
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {  
  console.log('Database connected. Connection open to ' + dbURI);
  dbSeeder.seed(mongoose.connection.db);
});

/*-- SET PORT --*/
app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

/*-- APP --*/
// 'view engine' setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use middleware
app.use(favicon(path.join(__dirname, 'public', 'images', 'icons', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api/index'));

/*-- ERROR HANDLERS --*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
