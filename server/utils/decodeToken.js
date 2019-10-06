const jwt = require('jsonwebtoken');
const options = require('../config/tokenOptions');

const decodeToken = (authorization) => {
  const [prefix, token] = authorization.split(' ');

  if (prefix === 'Bearer') {
    return jwt.verify(token, process.env.JWT_SECRET, options);
  }

  return new Error('token does not provide a Bearer');
};

module.exports=decodeToken;
