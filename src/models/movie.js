const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const { Star } = require("./star");

const Movie = sequelize.define("movie", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, required: true },
  year: { type: DataTypes.INTEGER, required: true },
  format: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

Movie.belongsToMany(Star, { through: "movie_stars", as: "stars" });

Star.belongsToMany(Movie, { through: "movie_stars", as: "movies" });

module.exports = {
  Movie,
};
