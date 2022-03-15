const express = require("express");

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const pageRoutes = require("./routes/pages");
const secureRoutes = require("./routes/secure");

const app = express();
const PORT = process.env.PORT || 5000;

// CONNECT TO DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());

// PAGE ROUTES
app.use("/", pageRoutes);

app.use("/api/user", userRoutes);

// AUTHENTICATION API ROUTES
app.use("/api/auth", authRoutes);

// SECURE API ROUTS
app.use("/api/secure", secureRoutes);

// STATIC ASSETS
app.use(express.static("public"));

// START THE SERVER
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
