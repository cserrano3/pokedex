const decodeToken = require('../utils/decodeToken');

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {// Bearer <token>
    try {
      const result = decodeToken(authHeader);
      if (result instanceof Error) {
        res.status(400).send({
          error: result.message,
        });
      } else {
        req.decoded = result;
        next();
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
