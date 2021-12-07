var Reservation = require('../../../models/reservation');
var User = require('../../../models/user');
var Bici = require('../../../models/bicycle');

var mongoose = require('mongoose');

const connectionString = 'mongodb+srv://juliparodi:figura123@cluster0.ixvq8.mongodb.net/juliParodiDatabase?retryWrites=true&w=majority';

describe('testing bicycles', function () {
    beforeEach(function (done) {
        try {
            // Connect to the MongoDB cluster
            mongoose.connect(
                connectionString,
                { useNewUrlParser: true, useUnifiedTopology: true });

            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection.error'));
            db.once('open', function () {
                console.log('we are connected to juliParodiDatabase');
                done();
            });
        } catch (e) {
            console.log("could not connect");
        }
    });

    afterEach(function (done) {
        Reservation.deleteMany({}, function (error, success) {
            if (error) console.log('error encountered during reservation deletion' + error);
            User.deleteMany({}, function (error, success) {
                if (error) console.log('error encountered during user deletion' + error);
                Bici.deleteMany({}, function (error, success) {
                    if (error) console.log('error encountered during bici deletion' + error);
                    mongoose.disconnect(error);
                    done();
                });
            });
        });
    });

    describe('when a user reserve a bici', () => {
        it('reserve must exist', () => {
            var user = new User({ name: 'Julian Parodi' });
            user.save(function (err, user) {
                if (err) return console.error(err);
                console.log(user.name + " saved to user collection.");
            });

            var bicycle = new Bici({ id_bicycle: 4, colour: 'black', model: 'Ferrari' });
            bicycle.save(function (err, bicycle) {
                if (err) return console.error(err);
                console.log(bicycle.colour + " saved to bicycle collection.");
            });
            var userLog = User.find({ name: 'Julian Parodi' });
            var biciLog = Bici.find({ id_bicycle: 4 });

            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            user.reserve(bicycle.id, today, tomorrow, function (error, reserve) {
                if (error) return console.error(error);
                Reservation.find({}).populate('bicycle').populate('user').exec(function (error, reservations) {
                    if (error) return console.error(error);
                    console.log(reservations[0]);
                    expect(reservations.length().toBe(1));
                    expect(reservations[0].bicycle.colour.toBe(bicycle.colour));
                    expect(reservations[0].ReservationDays().toBe(2));
                    expect(reservations[0].user.name.toBe(usuario.name));
                });

            });
        });
    });
});
