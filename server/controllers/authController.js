const User = require('../schemas/User');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');

const login = (req, res) => {
  const {email, password} = req.body;

  if (!email) {
    res.status(400).send({
      error: 'empty email',
    });
  } else {
    User.findOne({email}, (err, user) => {
      if (!err && user) {
        if (comparePassword(user.password, password)) {
          const token = generateToken({email: user.email});
          res.status(200).send({
            message: 'Logged successfully',
            token,
            email: user.email,
          });
        } else {
          res.status(401).send({
            error: 'Authentication error. Password does not match',
          });
        }
      } else {
        res.status(500).send(err);
      }
    });
  }
};

const AuthModule = {
  login,
};

module.exports = AuthModule;
