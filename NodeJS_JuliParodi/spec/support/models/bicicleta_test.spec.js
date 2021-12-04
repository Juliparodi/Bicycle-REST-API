var bici = require('../../../models/bicycle');
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
        bici.deleteMany({}, function (error, success) {
            if (error) console.log('ha ocurrido un error' + error);
            mongoose.disconnect(error);
            done();
        });
    });

    describe('bici.createInstance()', () => {
        it('create a new bici', () => {
            var bicii = bici.createInstance(1, 'red', 'motobike', [34.6712227, -58.3554249]);
            console.log(bicii);

            expect(bicii.colour).toBe('red');
            expect(bicii.model).toBe('motobike');
            expect(bicii.location[0]).toEqual(34.6712227);
        });
    });

    describe('bici.allBicis', () => {
        it('Look for bicis', (done) => {
            bici.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('bici.add', () => {
        it('add 1 bicy', (done) => {
            var b = new bici({ id_bicycle: 2, colour: 'yellow', model: 'motocicle', location: [-34.6725579, -58.3544143] });
            bici.add(b, function (err, newBici) {
                if (err) console.log('ha ocurrido un error' + err);
                bici.allBicis(function (err, bicis) {
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].colour).toBe(b.colour);
                    done();
                });
            });
        });

    });

    describe('bici.findByIdBicycle', () => {
        it('find 1 bicy', (done) => {
            var a = new bici({ id_bicycle: 2, colour: 'yellow', model: 'motocicle', location: [-34.6725579, -58.3544143] });
            bici.add(a, function (err, newBici) {
                var b = new bici({ id_bicycle: 3, colour: 'red', model: 'motoo', location: [-34.6725573, -58.3544153] });
                bici.add(b, function (err, newBici) {
                    bici.findByIdBicycle(b.id_bicycle, function (err, newBici) {
                        if (err) console.log('ha ocurrido un error' + err);
                        bici.allBicis(function (err, bicis) {
                            expect(bicis.length).toBe(2);
                            expect(newBici.colour).toBe(b.colour);
                            expect(newBici.model).toBe(b.model);
                            done();
                        });
                    });
                });
            });
        });
    });
});

/*
beforeEach(() => {
    bici.allBicis = [];
})
var a = new bici(1, 'red', 'motobike', [34.6712227, -58.3554249]);

describe('bici.allBicis', () => {
    it('Start empty', () => {
        expect(bici.allBicis.length).toBe(0);
    });
});

describe('bici.add', () => {
    it('added 1', () => {
        expect(bici.allBicis.length).toBe(0);

        bici.add(a);

        expect(bici.allBicis.length).toBe(1);
        expect(bici.allBicis[0]).toEqual(a);
    });
});

describe('bici.findById', () => {
    it('find bici with id 1', () => {

        var id = 1;
        bici.add(a);
        var bici2 = bici.findById(id);

        expect(bici.findById(1)).toEqual(a);

    });
});
*/