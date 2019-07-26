const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader; // Bearer <token>

    const options = {
      expiresIn: "2d",
      issuer: "test"
    };

    try {
      const result = jwt.verify(token, process.env.JWT_SECRET, options);
      req.decoded = result;
      next();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    res.status(401).send({
      error: "Token required"
    });
  }
};

module.exports = validateToken;
