let Bicycle = require('../../models/bicycle');

exports.bicycle_list = function (req, res) {
    return res.status(200).json({
        bicicletas: Bicycle.allBicis
    });
}

exports.bicycle_create = function (req, res) {
    let location =[req.body.latitude, req.body.longitude];
    var bici = new Bicycle(req.body.id, req.body.colour, req.body.model, location);

    Bicycle.add(bici);

    return res.status(200).json({
        bicicletas: Bicycle.allBicis
    });
}

exports.bicycle_delete = function(req, res){
    Bicycle.deleteById(req.body.id);
    res.redirect('/bicicletas');
};