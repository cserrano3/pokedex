const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader; // Bearer <token>

    const options = {
      expiresIn: '2d',
      issuer: 'pokemon-api',
    };

    const [prefix, parsedToken] = token.split(' ');

    try {
      if (prefix === 'Bearer') {
        const result = jwt.verify(parsedToken, process.env.JWT_SECRET, options);
        req.decoded = result;
        next();
      } else {
        res.status(400).send({
          error: 'Token does not provide Bearer',
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(401).send({
      error: 'Token required',
    });
  }
};

module.exports = validateToken;
