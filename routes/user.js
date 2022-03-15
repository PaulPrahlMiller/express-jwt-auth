const router = require("express").Router();
const validateToken = require("../middleware/tokenValidator");

router.post("/jwtpayload", validateToken, (req, res) => {
  const user = req.user;
  res.status(200).json({
    user,
  });
});

module.exports = router;
