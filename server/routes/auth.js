const Router = require('express');
const Auth = require('../controllers/authController');

const authRouter = new Router();

authRouter.route('/').post(Auth.login);

module.exports = authRouter;
