var mongoose = require('mongoose');
var Reservation = require('./reservation');
var Schema = mongoose.Schema

//constructor
var User = function (name) {
    this.name = name;   
}
var userSchema = new Schema({
    name: String
});

userSchema.methods.reserve = function(biciId, from, to, cb){
    var reservation = new Reservation({user: this._id, bicycle: biciId, from: from, to: to});
    console.log(reservation);
    reservation.save();
}


module.exports = mongoose.model('User', userSchema);