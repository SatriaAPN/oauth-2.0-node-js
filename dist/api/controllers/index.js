const {
    oAuth2Service
} = require('../../services');

const AuthController = require('./auth');

const authController = new AuthController(oAuth2Service);

module.exports = { authController }