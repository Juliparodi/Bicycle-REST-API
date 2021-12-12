let Reservation = require('../../models/reservation');
let User = require('../../models/user');
let Bici = require('../../models/bicycle');


exports.all_reservations_list = function (req, res) {
    Reservation.find({}).populate('bicycle').populate('user').exec(function (error, reservs) {
        console.log(reservs);
        if (error) return console.error(error);

        var reservTransformed = reservs.map(function (reserv) {
            return reserv.toJSON();
        });

        return res.send(reservTransformed);
    });
};

