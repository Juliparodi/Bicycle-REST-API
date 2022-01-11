var express = require('express');
var router = express.Router();
const userController = require('../controller/UserController.js')

/* GET users listing. */
router.get('/', userController.list);
router.get('/create', userController.create_get);
router.post('/create', userController.create);
router.get('/:id/update', userController.update_get);
router.post('/:id/update', userController.update_get);
router.post('/:id/delete', userController.delete);

module.exports = router;
