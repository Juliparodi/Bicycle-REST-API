var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var Reservation = function (from, to, bicycle_id, user_id) {
    this.from = from; 
    this.to = to;   
    this.bicycle = bicycle_id;   
    this.user = user_id;   
}

var reservationSchema = new Schema({
    from: Date,
    to: Date,
    bicycle: {type: mongoose.Schema.Types.ObjectId, ref: 'Bicicyle'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

reservationSchema.methods.ReservationDays = function(){
    return moment(this.from).diff(moment(this.to), 'days') + 1;
}

module.exports = mongoose.model('Reservation', reservationSchema);