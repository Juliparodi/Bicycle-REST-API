var bici = require('../../../models/bicycle');
var axios = require('axios');
var server = require('../../../bin/www');
var mongoose = require('mongoose');

const connectionString = 'mongodb+srv://juliparodi:figura123@cluster0.ixvq8.mongodb.net/juliParodiDatabase?retryWrites=true&w=majority';


url1 = 'http://localhost:3000/api/bicicletas/';
urlCreate = 'http://localhost:3000/api/bicicletas/create'

var jsonCreate = {
    "id": 4,
    "colour": "red",
    "model": "ferrari",
    "latitude": -34.6809673,
    "longitude": -58.3602928
};

describe('Bici Api', function () {
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
        bici.deleteMany({}, function (error, success) {
            console.log("deleting...");
            if (error) console.log('ha ocurrido un error' + error);
            mongoose.disconnect(error);
            done();
        });
    });

    describe('GET Bicycles', () => {
        it('Status 200', () => {

            axios.get(url1)
                .then(function (response) {
                    expect(response.status).toBe(200);
                })
            expect(bici.allBicis.length).toBe(1);
        });
    })

    describe('POST Bicycles', () => {
        it('Status 200 with body', () => {
            axios.post(urlCreate,
                jsonCreate)
                .then(function (response) {
                    bici.find({ id_bicycle: 4 }).exec(function (error, bici) {
                        if (error) return handleErr(error);
                        console.log(bici[0]);
                        expect(response.status).toBe(200);
                        expect(bici[0].colour).toBe('red');
                    });
                });
        });
    })
});