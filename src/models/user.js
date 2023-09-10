const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const { emailRegexp, nameRegexp } = require("../regexp/user");

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { is: nameRegexp },
      len: [3, ""],
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: emailRegexp,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [8, ""],
    },

    accessToken: { type: DataTypes.STRING, defaultValue: null },
  },
  {
    indexes: [
      {
        fields: ["email"],
      },
      {
        fields: ["id"],
      },
    ],
  }
);

module.exports = {
  User,
};
