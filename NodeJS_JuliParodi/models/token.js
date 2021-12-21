var mongoose = require('mongoose');
var Schema = mongoose.Schema

var tokenSchema = new Schema({
    token: {
        type: String,
        required: [true, 'Token is mandatory']
    },
    creationDate: {
        type: Date,
		default: Date.now,
		required: [true, 'Date is mandatory'],
        expires: 43200
    },
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Token', tokenSchema);
