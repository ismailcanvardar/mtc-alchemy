const { default: mongoose } = require("mongoose");
const { MONGO_URI } = require("../constants");

function connectDatabase() {
  mongoose.connect(MONGO_URI);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", () => {
    console.log("DB successfully connected!");
  });
}

module.exports = connectDatabase;
