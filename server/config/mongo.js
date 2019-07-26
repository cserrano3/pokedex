const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      connectTimeoutMS: 5000
    });
    console.log("MONGO connected successfully");
  } catch (e) {
    console.log(`Error: There was an error while trying to connect - ${e}`);
  }
};

const mongoConfig = {
  connectDB
};

module.exports = mongoConfig;
