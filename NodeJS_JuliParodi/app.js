var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
const session = require('express-session');
const passport = require('./config/passport');

const Usuario = require('./models/user');
const Token = require('./models/token');
const jwt = require('jsonwebtoken');


let store = new session.MemoryStore

const connectionString = process.env.MONGO_URI;

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
var tokenRouter = require('./routes/token');
var bicycleRouter2 = require('./routes/api/bicicletas');
var userRouter = require('./routes/api/user');
var reservationRouter = require('./routes/api/reservation');
var nodeMailerRouter = require('./routes/api/nodemailer');
var authApiRouter = require('./routes/api/auth');



var app = express();
app.set('secretKey', 'jwt_pwd_!!223344');
app.use(session({
  cookie: { maxAge: 240 * 60 * 60 * 1000 },
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: '...'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/bicicletas', loggerIn, bicycleRouter);
app.use('/token', tokenRouter);
app.use('/api/bicicletas', validarUsuario, bicycleRouter2);
app.use('/api/user', userRouter);
app.use('/api/auth', authApiRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/send_plain_mail', nodeMailerRouter);

app.use('/login', function (req, res) {
  res.render('session/login');
});

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, usuario, info) {
    if (err) return next(err);
    if (!usuario) return res.render('session/login', { info });
    req.login(usuario, function (err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
app.get('/forgotPassword', function (req, res) {
  res.render('session/forgotPassword');
});
app.post('/forgotPassword', function (req, res, next) {
  Usuario.findOne({ email: req.body.email }, function (err, usuario) {
    if (!usuario) return res.render('session/forgotPassword', { info: { message: 'Noexite el email para un usuario existente' } });
    usuario.resetPassword(function (err) {
      if (err) return next(err);
      console.log('session/forgotPasswordMessage');
    });
    res.render('session/forgotPasswordMessage');
  });
});

app.get('/resetPassword/:token', function (req, res, next) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'No existe un usuario asociado al token. Verifique que su token no haya expirado' });
    Usuario.findById(tokenRouter._userId, function (err, usuario) {
      if (!usuario) return res.status(400).send({ msg: 'No existe un usuario asociado al token.' });
      res.render('session/resertPassword', { erros: {}, usuario: usuario });
    });
  });
  res.render('session/forgotPassword');
});

app.post('resetPassword', function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    res.render('session/resetPassword', {
      errors: { confirm_password: { message: 'No coincide con el possword ingresado' } },
      usuario: new Usuario({ email: req.body.email })
    });
    return;
  }
  Usuario.findOne({ email: req.body.email }, function (err, usuario) {
    usuario.password = req.body.password;
    usuario.save(function (err) {
      if (err) {
        res.render('session/resetPassword', { errors: err.errors, usuario: new Usuario({ email: req.body.email }) });
      } else {
        res.redirect('login');
      }
    });
  });
});

app.use('/privacy_policy', function (req, res) {
  res.sendFile('public/privacy_policy.html');
});

app.use('/googlee3187483ce497af4', function (req, res) {
  res.sendFile('public/googlee3187483ce497af4.html');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read']
  })
);

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/error'
}));


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

function loggerIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('user sin loguearse');
    res.redirect('/login');
  }
};

function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      req.body.userId = decoded.id;
      console.log('jwt verify: ' + decoded);
      next();
    }
  });
}

module.exports = app;

