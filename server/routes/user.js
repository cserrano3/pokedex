const Router = require('express');
const userController = require('../controllers/userController');
const validateToken = require('../utils/validateToken');

const userRouter = new Router();

userRouter.route('/register').post(userController.register);
userRouter.route('/').get(validateToken, userController.getAllUsers);
userRouter.route('/:id').get(validateToken, userController.getUser);

module.exports = userRouter;
