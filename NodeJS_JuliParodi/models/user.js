var mongoose = require('mongoose');
var Reservation = require('./reservation');
var Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

const Token = require('../models/token');
const mailer = require('../mailer/mailer');


const saltRounds = 10;

//constructor
var User = function (name) {
    this.name = name;
}

const validateEmail = function(email){
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);

}
var userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is mandatory']
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        validate: [validateEmail, 'please add a valid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        required: [true, 'Email is mandatory'],
        lowercase: true
    },
    password:{
        type: String,
        required: [true, 'Password is mandatory'],
    },
    passwordResetToken: String,
    passwordReseTokenExpires: Date,
    verified: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator, {message: '{PATH} exists with another user'})

userSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }

    next();
});

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.reserve = function (bici, from, to, cb) {
    var reservation = new Reservation({ user: this._id, bicycle: bici.id, from: from, to: to });
    console.log(reservation);
    return reservation.save(cb);
};

userSchema.methods.enviar_email_bienvenido = function (biciId, desde, hasta, cb) {
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;
    token.save(function (err) {
        if (err) { return console.log(err.message); }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Verificacion de cuenta',
            text: 'Hola, \n\n' + 'Por favor, para verificar su cuenta haga click en este link: \n' + 'http://localhost:5000' + '\/token/confirmation\/' + token.token + '.\n'
        };

        mailer.sendMail(mailOptions, function (err) {
            if (err) { return console.log(err.message); }
            console.log('Se ha enviado un email de bienvenida a: ' + email_destination);
        });
    });
}

userSchema.methods.resetPassword = function (cb) {
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;
    token.save(function (err) {
        if (err) { return cb(err); }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Reseteo de password de cuenta',
            text: 'Hola, \n\n' + 'Por favor, para resetear el password de su cuenta haga click en este link: \n' + 'http://localhost:5000' + '\/resetPassword\/' + token.token + '.\n'
        };

        mailer.sendMail(mailOptions, function (err) {
            if (err) { return cb(err); }
            console.log('Se ha enviado un email para resetear el password a: ' + email_destination);
        });
        cb(null);
    });
}

userSchema.statics.findOrCreateByGoogle = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or: [
            { 'googleId': condition.id },
            { 'email': condition.emails[0].value }
        ]
    }, (err, result) => {
        if (result) {
            callback(err, result);
        } else {
            console.log('---else---');
            console.log(condition);
            let values = {};
            values.googleId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || 'Sin Nombre';
            values.verificado = true;
            values.password = condition._json.etag || 'desde google';
            console.log("values");
            console.log(values);
            self.create(values, (err, result) => {
                if (err) console.log(err);
                return callback(err, result);
            });
        }
    });
};

userSchema.statics.findOrCreateByFacebook = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or: [
            { 'facebookId': condition.id },
            { 'email': condition.emails[0].value }
        ]
    }, (err, result) => {
        if (result) {
            callback(err, result);
        } else {
            console.log('---else---');
            console.log(condition);
            let values = {};
            values.facebookId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || 'Sin Nombre';
            values.verificado = true;
            values.password = crypto.randomBytes(16).toString('hex');
            console.log("values");
            console.log(values);
            self.create(values, (err, result) => {
                if (err) console.log(err);
                return callback(err, result);
            });
        }
    });
};


/**
 * toJSON implementation in order to delete id of MongoDB
 */
userSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};


module.exports = mongoose.model('User', userSchema);