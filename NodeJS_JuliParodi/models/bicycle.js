var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//constructor
var Bicycle = function (id, colour, model, location){
    this.id = id;
    this.colour = colour;
    this.model = model;
    this.location = location;
}

//2dsphere is a geographic type.
var BiciSchema = mongoose.Schema({
    id_bicycle: Number,
    colour: String,
    model: String,
    location: {
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
});

//insert into database
BiciSchema.statics.createInstance = function (id, colour, model, location) {
    return new this({
        id_bicycle: id,
        colour: colour,
        model:  model,
        location: location
    });
}

BiciSchema.methods.toString = function () {
    return 'Bicicleta de color: ' + this.colour + ' y modelo: ' + this.model + ' y se encuentra en: ' + this.location;
}

//statics = loook for records in DB
BiciSchema.statics.allBicis = function (cb) {
    return this.find({}, cb);
}

BiciSchema.statics.add = function (aBici, cb) {
    this.create(aBici, cb);
}

BiciSchema.statics.findByIdBicycle = function (id, cb) {
    return this.findOne({id_bicycle: id}, cb);
}

BiciSchema.statics.deleteByIdBicycle = function (aBici, cb) {
    return this.deleteOne({id_bicycle: id}, cb);
}


/*
Bicycle.allBicis = [];
Bicycle.add = function (aBici) {
    Bicycle.allBicis.push(aBici);
}


Bicycle.add = function (aBici) {
    BiciSchema.createInstance(aBici.id_bicycle, aBici.colour, aBici.model, aBici.location);
}

Bicycle.findById = function (id) {
    var Bici = Bicycle.allBicis.find(x => x.id == id);
    if (Bici) {
        return Bici;
    } else {
        throw new Error(`There is no Bicycle found with id $(id)`);
    }

}

Bicycle.deleteById = function (id) {
    var Bici = Bicycle.allBicis.find(x => x.id == id);
    if (Bici) {
        for (var i = 0; i < Bicycle.allBicis.length; i++) {
            if (Bicycle.allBicis[i].id == id) {
                Bicycle.allBicis.splice(i, 1);
                break;
            }
        }
    } else {
        throw new Error(`we cannot remove Bicycle with id $(id)`);
    }

}

var a = new Bicycle(1, 'red', 'motobike', [34.6712227, -58.3554249]);
var b = new Bicycle(2, 'yellow', 'motocicle', [-34.6725579, -58.3544143]);

Bicycle.add(a);
Bicycle.add(b);
*/

module.exports = mongoose.model('Bicycle', BiciSchema);
