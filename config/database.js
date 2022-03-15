const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  // Create mongoose connection to database
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mgDB = mongoose.connection;

  mgDB.on("connected", console.log.bind(console, "Connected to MongoDB"));
}

module.exports = connectDB;
