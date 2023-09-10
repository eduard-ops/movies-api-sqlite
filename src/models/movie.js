const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const { Star } = require("./star");

const { titleRegexp } = require("../regexp/movie");

const Movie = sequelize.define(
  "movie",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
      type: DataTypes.STRING,
      required: true,
      validate: { is: titleRegexp },
      unique: true,
    },
    year: {
      type: DataTypes.INTEGER,
      required: true,
      validate: { isInt: true, min: 1900, max: new Date().getFullYear() },
    },
    format: {
      type: DataTypes.ENUM("VHS", "DVD", "Blu-Ray"),
      required: true,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        fields: ["title"],
      },
      {
        fields: ["year"],
      },
    ],
  }
);

Movie.belongsToMany(Star, {
  through: "movie_stars",
  as: "stars",
  timestamps: false,
});

Star.belongsToMany(Movie, {
  through: "movie_stars",
  as: "movies",
  timestamps: false,
});

module.exports = {
  Movie,
};
