const mongoose = require("mongoose");
const { MONGO_DB_URI } = process.env;

mongoose
  .connect(MONGO_DB_URI, {
    maxPoolSize: 10,
    family: 4,
    connectTimeoutMS: 15000,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(`Database connection error : ${err}`);
  });

const db = mongoose.connection;

module.exports = db;
