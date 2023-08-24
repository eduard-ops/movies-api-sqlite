const Joi = require("joi");

const joiMovieAddSchema = Joi.object({
  title: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/)
    .min(3)
    .required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
  format: Joi.string().valid("VHS", "DVD", "Blu-ray"),
  stars: Joi.array().items(Joi.string().required()).required(),
});

module.exports = {
  joiMovieAddSchema,
};
