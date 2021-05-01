const mongoose = require("mongoose");

const databaseUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/complaints";

/*
 *  Connet to mongoDB
 */
mongoose.connect(databaseUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected to database successfully");
});

module.exports = db;
