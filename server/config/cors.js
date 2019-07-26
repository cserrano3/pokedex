const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //  wow  very secure
  res.header("Access-Control-Allow-Methods", ["GET", "PUT", "POST", "DELETE"]); // allow these verbs
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );
  next();
};

const CorsModule = {
  cors
};

module.exports = CorsModule;
