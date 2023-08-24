const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, len: [3, ""] },
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
});

module.exports = {
  User,
};
