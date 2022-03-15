const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateToken = require("../middleware/tokenValidator");

router.post("/", validateToken, (req, res) => {
  res.status(200).json({
    valid: true,
    message: "Token validated",
  });
});

router.post("/register", async (req, res) => {
  // CREATE AN OBJECT WITH THE REQUEST DATA
  const requestData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // vALIDATE THE DATA;
  const { error } = registerValidation(requestData);

  // IF DATA VALIDATION ERRORS, RESPOND WITH ERROR
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  // CHECK IF EMAIL IS ALREADY IN THE DATABASE
  const emailInUse = await User.findOne({
    email: req.body.email,
  });

  // IF THE EMAIL EXISTS, RESPOND WITH ERROR
  if (emailInUse) {
    return res.status(409).json({
      error: "That email is already in use",
    });
  }

  // GENERATE PASSWORD SALT
  const salt = await bcrypt.genSalt(10);

  // GENERATE PASSWORD HASH USING THE SALT AND USERS PASSWORD
  const hash = await bcrypt.hash(req.body.password, salt);

  // CREATE USER OBJECT
  const user = new User({
    ...requestData,
    password: hash,
  });

  // CREATE AND RESPOND WITH JWT, REDIRECT TO SECURED ROUTE
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1 day",
    });
    res.json({
      user: user._id,
      redirect: "dashboard",
      token,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  // CREATE REQUEST DATA OBJECT AND VALIDATE
  const requestData = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error } = loginValidation(requestData);

  // IF ERROR, RRESPOND WITH ERROR
  if (error) {
    return res.status(400).json({ error });
  }

  // GET USER FROM DATABASE
  const user = await User.findOne({ email: req.body.email });

  // IF USER NOT FOUND RESPOND WITH ERROR
  if (!user) {
    return res.status(400).json({
      error: "That user does not exist!",
    });
  }

  // CHECK PASSWORD IS CORRECT
  const isPassword = await bcrypt.compare(req.body.password, user.password);

  // IF PASSWORD DOES NOT MATCH, RESPOND WITH ERROR
  if (!isPassword) {
    return res.status(401).json({
      error: "Incorrect password",
    });
  }

  // CREATE AND RESPOND WITH JWT, REDIRECT TO SECURED ROUTE
  try {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1 day",
    });
    res.status(200).json({
      data: req.body,
      token,
      redirect: "dashboard",
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
