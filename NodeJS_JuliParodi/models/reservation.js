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
    bicycle: {type: mongoose.Schema.Types.ObjectId, ref: 'Bicycle'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

reservationSchema.methods.ReservationDays = function(){
    return moment(this.from).diff(moment(this.to), 'days') + 1;
}


/**
 * toJSON implementation in order to delete id of MongoDB
 */
 reservationSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

module.exports = mongoose.model('Reservation', reservationSchema);