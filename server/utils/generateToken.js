const jwt = require('jsonwebtoken');
const moment = require('moment');

const generateToken = (payload) => {
  const expiresIn = moment()
      .utc()
      .add({days: 2})
      .unix();
  const options = {
    expiresIn,
    issuer: 'pokemon-api',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};

module.exports = generateToken;
