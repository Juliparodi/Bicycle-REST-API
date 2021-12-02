var express = require('express');
var router = express.Router();
var bicycleController = require('../../controller/api/BicycleControllerAPI');

router.get('/', bicycleController.bicycle_list);
router.post('/create', bicycleController.bicycle_create);
router.post('/delete', bicycleController.bicycle_delete);


module.exports = router;