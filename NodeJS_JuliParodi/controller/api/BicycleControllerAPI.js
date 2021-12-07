let Bicycle = require('../../models/bicycle');

exports.bicycle_list = function (req, res) {
    Bicycle.find().exec(function (error, bicis){
        if(error) return handleErr(error);

        var transformedBicis = bicis.map(function(bici) {
            return bici.toJSON();
        });

        return res.send(transformedBicis);
    });
};

exports.bicycle_create = function (req, res) {
    let location = [req.body.latitude, req.body.longitude];
    var bici = new Bicycle({ id_bicycle: req.body.id, colour: req.body.colour, model: req.body.model, location: location });

    var biciCreada = bici.save();
    console.log(biciCreada);

    res.status(200).send('created succesfully');

}

exports.bicycle_delete = function (req, res) {
  
    Bicycle.deleteOne({ id: req.body.id }, function (err) {
      if(err) console.log(err);
      console.log("Successful deletion");
    });

    res.status(200).send('deleted succesfully');
};