// +++++++++++++++++++++++++++ IMPORT AND SETUP MODULES ++++++++++++++++++++++++++ //

require("dotenv").config(); // configuration for dotenv file
const express = require("express"); // Importing express for making API endpoints and making HTTP requests.
const { PORT, SESSION_SECRET } = process.env;
require("./configs/mongoose");
const session = require("express-session");
const app = express(); // creating our express app here

// +++++++++++++++++++++++ USING MIDDLEWARE FROM HERE +++++++++++++++++++++++++ //

app.use(express.json()); // using this to parse json

app.use(
  session({
    name: "Polling System",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000, // session expire in 1 hour
    },
  })
);

app.use("/api/v1/questions", require("./routes/api/v1/question_route")); // using question controller with endpoint /qusetions
app.use("/api/v1/options", require("./routes/api/v1/option_route")); // using option controller with endpoint /options

// ++++++++++++++++++++++++++++++ LISTENING SERVER HERE ++++++++++++++++++++++++++++ //
app.listen(PORT, () => {
  console.log(`Server running successful on http://localhost:${PORT}`);
});
