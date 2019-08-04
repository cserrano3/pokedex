const mongoose = require("mongoose");

/* const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB
} = process.env; 
  Use on Docker Image
*/ 

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
  connectTimeoutMS: 10000,
};

//const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`; Docker Image
const url = 'mongodb://127.0.0.1:27017/pokedex' // - Localhost only

const connectDB = async () => {
  try {
    await mongoose.connect(url, options);
    console.log("MONGO connected successfully");
  } catch (e) {
    console.log(`Error: There was an error while trying to connect - ${e}`);
  }
};

const mongoConfig = {
  connectDB
};

module.exports = mongoConfig;
