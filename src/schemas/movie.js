const Joi = require("joi");

const joiMovieAddSchema = Joi.object({
  title: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9\s.,'":!?-]+$/)
    .min(3)
    .required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
  format: Joi.string().valid("VHS", "DVD", "Blu-ray"),
  stars: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
        .required()
    )
    .required(),
});

module.exports = {
  joiMovieAddSchema,
};
