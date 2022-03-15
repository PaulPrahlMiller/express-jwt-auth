const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    username: Joi.string().min(1).max(32).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
