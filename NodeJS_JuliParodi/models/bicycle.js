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

Bicycle.findById = function(id){
    var Bici = Bicycle.allBicis.find(x => x.id == id);
    if(Bici){
        return Bici;
    } else {
        throw new Error(`There is no Bicycle found with id $(id)`);
    }
    
}

Bicycle.deleteById = function(id){
    var Bici = Bicycle.allBicis.find(x => x.id == id);
    if(Bici){
       for(var i = 0; i < Bicycle.allBicis.length; i++){
           if(Bicycle.allBicis[i].id == id){
            Bicycle.allBicis.splice(i, 1);
            break;
           }
       }
    } else {
        throw new Error(`we cannot remove Bicycle with id $(id)`);
    }

}

var a = new Bicycle(1, 'red', 'motobike', [34.6712227,-58.3554249]);
var b = new Bicycle(2, 'yellow', 'motocicle', [-34.6725579,-58.3544143]);

Bicycle.add(a);
Bicycle.add(b);


module.exports = Bicycle;