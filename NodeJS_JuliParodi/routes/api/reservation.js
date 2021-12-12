var express = require('express');
var router = express.Router();
var reservationController = require('../../controller/api/reservationControllerAPI');

router.get('/', reservationController.all_reservations_list);

module.exports = router;