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

const updateUser = (id, updateValue) => new Promise((resolve, reject) => {
  User.findByIdAndUpdate(id, {updateValue}, {new: true}, (error, result) => {
    console.log('error................. ', error);
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

const getAllUsers = () => new Promise((resolve, reject) => {
  User.find({})
      .then((result) => {
        if (result.length === 0) {
          reject({error: 'Users not found', type: 'not-found'});
        }

        resolve(result);
      })
      .catch((error) => reject({error, type: 'server'}));
});

const getUser = (id) => new Promise((resolve, reject) => {
  User.findById(id)
      .then(result => resolve(result))
      .catch(error => reject(error));
});

const UserUseCase = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
};

module.exports = UserUseCase;
