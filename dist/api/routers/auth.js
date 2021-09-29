const router = require('express')();
const { authController } = require('../controllers');

router.get('/google', authController.getGoogleAuth);

router.get('/google/uri', authController.getGoogleAuthUri);

module.exports = router;