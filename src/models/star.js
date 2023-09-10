const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const { starRegexp } = require("../regexp/star");

const Star = sequelize.define(
  "star",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.TEXT,
      required: true,
      validate: { is: starRegexp },
      unique: true,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        fields: ["name"],
      },
    ],
  }
);

module.exports = {
  Star,
};
