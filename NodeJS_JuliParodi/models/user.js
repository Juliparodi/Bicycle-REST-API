var mongoose = require('mongoose');
var Reservation = require('./reservation');
var Schema = mongoose.Schema

//constructor
var User = function (name) {
    this.name = name;
}
var userSchema = new Schema({
    name: String,
    surname: String,
    cellPhone: Number
});

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