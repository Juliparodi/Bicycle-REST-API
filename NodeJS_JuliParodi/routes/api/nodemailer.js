var express = require('express');
var router = express.Router();
var NodeMailerAPI = require('../../controller/api/NodeMailerAPI');

router.get('/api/send_plain_mail', NodeMailerAPI.send_email);

module.exports = router;
