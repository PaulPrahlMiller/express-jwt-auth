const router = require("express").Router();
const validateToken = require("../middleware/tokenValidator");

router.get("/dashboard", validateToken, (req, res) => {
  res.redirect("dashboard");
});

module.exports = router;
