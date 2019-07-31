const bcrypt = require("bcryptjs");

const comparePassword = (existingPassword, providedPassword) => {
  return bcrypt
    .compare(existingPassword, providedPassword)
    .then(match => match)
    .catch(notMatch => notMatch);
};

module.exports = comparePassword;
