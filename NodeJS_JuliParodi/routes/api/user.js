var express = require('express');
var router = express.Router();
var userController = require('../../controller/api/UserControllerAPI');

router.get('/', userController.all_user_list);
router.post('/update', userController.user_update);
router.post('/create', userController.user_create);
router.post('/delete', userController.user_delete);

module.exports = router;