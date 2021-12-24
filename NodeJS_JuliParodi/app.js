var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

const connectionString = 'mongodb+srv://juliparodi:figura123@cluster0.ixvq8.mongodb.net/juliParodiDatabase?retryWrites=true&w=majority';

try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection.error'));
    db.once('open', function(){
        console.log('we are connected to juliParodiDatabase');
    });
} catch (e) {
  console.log("could not connect");
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicycleRouter = require('./routes/bicicletas');
var bicycleRouter2 = require('./routes/api/bicicletas');
var userRouter = require('./routes/api/user');
var reservationRouter = require('./routes/api/reservation');
var nodeMailerRouter = require('./routes/api/nodemailer');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicycleRouter);
app.use('/api/bicicletas', bicycleRouter2);
app.use('/api/user', userRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/send_plain_mail', nodeMailerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

