var express = require('express');
var router = express.Router();
var bicycleController = require('../controller/BicycleController');

/* GET bicycles listing. */
router.get('/', bicycleController.bicycle_list);

module.exports = router;