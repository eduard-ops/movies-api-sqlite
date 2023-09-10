const Joi = require("joi");

const { titleRegexp } = require("../regexp/movie");

const { starRegexp } = require("../regexp/star");

const joiMovieAddSchema = Joi.object({
  title: Joi.string().trim().pattern(titleRegexp).min(3).required(),
  year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
  format: Joi.string().valid("VHS", "DVD", "Blu-Ray"),
  stars: Joi.array()
    .items(Joi.string().pattern(starRegexp).required())
    .required(),
});

module.exports = {
  joiMovieAddSchema,
};
