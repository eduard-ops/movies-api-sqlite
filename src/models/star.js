const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const Star = sequelize.define("star", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.TEXT, required: true },
});

module.exports = {
  Star,
};
