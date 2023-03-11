const mongoose = require("mongoose");
const { MONGO_DB_URI } = process.env; // saving mongodb uri in .env file

// connect to MongoDB using mongoose
mongoose
  .connect(MONGO_DB_URI, {
    maxPoolSize: 10, // maximum number of connection
    family: 4, // forcely using IPv4
    connectTimeoutMS: 15000, // max time for connection
  })
  .then(() => {
    console.log("Database connected successfully"); // if database connected
  })
  .catch((err) => {
    console.log(`Database connection error : ${err}`); // if any connection error
  });

// exporting mongoose connection object
const db = mongoose.connection;

module.exports = db;
