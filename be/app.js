var express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var cors = require("cors");

require("./config/database");

const usersRouter = require("./routes/users");
const complaintsRouter = require("./routes/complaints");

const app = express();
// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // to work locally

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/complaints", complaintsRouter);

module.exports = app;
