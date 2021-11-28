var Bicycle = require('../models/bicycle.js');
console.log(Bicycle);


let biciArray = Bicycle;
console.log(biciArray);
console.log(Bicycle.allBicis);

exports.bicycle_list = function(req, res){
    console.log(Bicycle.allBicis);
    res.render('bicicletas/index', {bicis : Bicycle.allBicis});
};