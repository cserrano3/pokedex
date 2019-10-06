const UserUseCase = require('../usecases/user.js');

const register = (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;

  UserUseCase.createUser({
    name,
    email,
    password,
  }).then((result) => {
    res.status(200).json({
      message: 'user created successfully',
      result,
    });
  }).catch((error) => {
    if (error.msg || error.fields) {
      res.status(400).json(error);
    } else {
      res.status(500).json(error);
    }
  });
};

const getAllUsers = (req, res) => UserUseCase.getAllUsers()
    .then((result) => {
      res.status(200).send({
        message: 'users found successfully',
        result,
      });
    }).catch((error) => {
      let status;
      if (error.type === 'not-found') {
        status = 404;
      } else {
        status = 500;
      }

      res.status(status).send(error);
    });

const getUser = (req, res) => UserUseCase.getUser(req.params.id)
    .then(result => res.status(200).send({
      message: 'User found',
      result,
    })).catch(error => res.status(500).send(error));

const UserController = {
  register,
  getAllUsers,
  getUser,
};

module.exports = UserController;
