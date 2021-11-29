var express = require('express');
var router = express.Router();
var bicycleController = require('../controller/BicycleController');

/* GET bicycles listing. */
router.get('/', bicycleController.bicycle_list);
router.get('/create', bicycleController.bicycle_create_get);
router.post('/create', bicycleController.bicycle_create_post);
router.post('/:id/delete', bicycleController.bicycle_delete_post);
router.get('/:id/update', bicycleController.bicycle_update_get);
router.post('/:id/update', bicycleController.bicycle_update_post);




module.exports = router;