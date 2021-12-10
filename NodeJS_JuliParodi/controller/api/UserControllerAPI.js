let User = require('../../models/user');

exports.all_user_list = function (req, res) {
    User.find().exec(function (error, users) {
        if (error) return handleErr(error);

        var usersTransformed = users.map(function (user) {
            return user.toJSON();
        });

        return res.send(usersTransformed);
    });
};

exports.user_create = function (req, res) {
    if (req.body.name == null) {
        throw new Error('Please provide name of the user');
    }
    var user = new User({ name: req.body.name, surname: req.body.surname, cellPhone: req.body.cellPhone});

    var userCreated = user.save();
    console.log(userCreated);

    res.status(200).send('created succesfully ' + user.name + ' user');
}

exports.user_delete = function (req, res) {

    User.deleteOne({ name: req.body.name }, function (err) {
        if (err) console.log(err);
        console.log("Successful deletion");
    });

    res.status(200).send('deleted succesfully');
};

exports.user_update = function (req, res) {

    nameQuery = req.query;

    User.find(nameQuery).exec(function (error, userFound) {
        if (error) return handleErr(error);
        if (userFound == null) {
            throw new Error('user with name: ' + req.params.name + ' not found');
        }
        console.log(userFound);
        var userToUpdate = {
            name: req.body.name,
            surname: req.body.surname,
            cellPhone: req.body.cellPhone
        }

        User.updateOne(nameQuery, userToUpdate, function (err, res) {
            if (err) console.log(err);
            console.log(res);
            console.log("Succesful update");
        });
    });

    res.status(200).send('Succesful update');
};
