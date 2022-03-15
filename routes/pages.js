const router = require("express").Router();
const path = require("path");

router.get("/dashboard", (req, res) => {
  res.sendFile(path.resolve("public", "dashboard.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve("public", "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.resolve("public", "register.html"));
});

module.exports = router;
