var express = require('express');
var router = express.Router();
var bicycleController = require('../../controller/api/BicycleControllerAPI');

router.get('/', bicycleController.bicicleta_list);
router.post('/create', bicycleController.bicicleta_create);
router.post('/delete', bicycleController.bicycle_delete);


module.exports = router;