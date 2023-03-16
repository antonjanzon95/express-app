var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors());

MongoClient.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Databasen är ok");

    const db = client.db("projekt1");
    app.locals.db = db;
  })
  .catch((error) => console.error(error));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
