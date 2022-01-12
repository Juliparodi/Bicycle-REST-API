const express = require('express');
const router = express.Router();
const authCtrl = require('../../controllers/api/AuthController');
const passport = require('../../config/passport');

router.post('/autenticate', authCtrl.authenticate);
router.post('/forgotPassword', authCtrl.forgotPassword);
router.post('/facebook_token', passport.authenticate('facebook-token'), authCtrl.authFacebookToken);

module.exports = router;