const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const joiUserRegisterSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/)
    .min(3)
    .required(),
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
