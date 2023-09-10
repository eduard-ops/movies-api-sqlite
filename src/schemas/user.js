const Joi = require("joi");

const { nameRegexp, emailRegexp } = require("../regexp/user");

const joiUserRegisterSchema = Joi.object({
  name: Joi.string().trim().pattern(nameRegexp).min(3).required(),
  email: Joi.string().trim().pattern(emailRegexp).required(),
  password: Joi.string().trim().min(8).required(),
});

const joiUserLoginSchema = Joi.object({
  email: Joi.string().trim().pattern(emailRegexp).required(),
  password: Joi.string().trim().min(8).required(),
});

module.exports = {
  joiUserRegisterSchema,
  joiUserLoginSchema,
};
