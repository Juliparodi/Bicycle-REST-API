var Bicycle = require('../models/bicycle.js');

exports.bicycle_list = function(req, res){
    res.render('bicicletas/index', {bicis : Bicycle.allBicis});
};

exports.bicycle_create_get = function(req, res){
    res.render('bicicletas/create');
};

exports.bicycle_create_post = function(req, res){
    let location =[req.body.latitude, req.body.longitude];
    var bici = new Bicycle(req.body.id, req.body.colour, req.body.model, location);
    Bicycle.add(bici);
    res.redirect('/bicicletas');
};

exports.bicycle_delete_post = function(req, res){
    Bicycle.deleteById(req.body.id);
    res.status(204).send();
};


exports.bicycle_update_get = function(req, res){
    var bici =  Bicycle.findById(req.params.id);
     res.render('bicicletas/update', { bici });
 };
 
 exports.bicycle_update_post = function(req, res){
     let location =[req.body.latitude, req.body.longitude];
     var bici =  Bicycle.findById(req.params.id);
     if(bici){
         bici.id = req.body.id;
         bici.colour = req.body.colour;
         bici.model = req.body.modely
         ;
         bici.location = location;
     }else {
         throw new Error(`There is no Bicycle found with id $(req.params.id)`);
     }
     res.redirect('/bicicletas');
 };
