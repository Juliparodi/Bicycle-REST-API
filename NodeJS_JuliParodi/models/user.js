var mongoose = require('mongoose');
var Reservation = require('./reservation');
var Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');


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