var Bicycle = function (id, colour, model, location){
    this.id = id;
    this.colour = colour;
    this.model = model;
    this.location = location;
}

Bicycle.prototype.toString = function(){
    return 'Bicicleta de color: ' + this.colour + ' y modelo: ' + this.model + ' y se encuentra en: ' + this.location;
}

Bicycle.allBicis = [];
Bicycle.add = function(aBici){
    Bicycle.allBicis.push(aBici);
}

var a = new Bicycle(1, 'red', 'motobike', [34.6712227,-58.3554249]);
var b = new Bicycle(2, 'yellow', 'motocicle', [-34.6725579,-58.3544143]);

Bicycle.add(a);
Bicycle.add(b);


module.exports = Bicycle;