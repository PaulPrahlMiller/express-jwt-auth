const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;

  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    res.status(401).json({
      message: "No token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "Invalid token",
    });
  }
};

module.exports = validateToken;
