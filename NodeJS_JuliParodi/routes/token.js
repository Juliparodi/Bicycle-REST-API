var express = require('express');
var router = express.Router();
const tokenCtrl = require('../controller/TokenController');

router.get('/confirmation/:token', tokenCtrl.confirmationGet);

module.exports = router;