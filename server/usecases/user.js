const User = require('../schemas/User');
const ErrorHandler = require('../utils/errorHandling');

const createUser = ({name, email, password}) => {
  return new Promise((resolve, reject) => {
    User.create(
        {
          name,
          email,
          password,
        },
        (error, result) => {
          if (error && error.errors) {
            const errorObj = ErrorHandler.handleSchemaError(error.errors);
            reject(errorObj);
          } else {
            resolve(result);
          }
        }
    );
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({})
        .then((result) => {
          if (result.length === 0) {
            reject({error: 'Users not found', type: 'not-found'});
          }

          resolve(result);
        })
        .catch((error) => reject({error, type: 'server'}));
  });
};

const UserUseCase = {
  createUser,
  getAllUsers,
};

module.exports = UserUseCase;
