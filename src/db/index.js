const { dbName, dbUser, dbPassword } = require("../config");

const path = require("path");

const { Sequelize } = require("sequelize");

const databasePath = path.join(__dirname, "../../", "database.sqlite3");

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "sqlite",
  host: databasePath,
  logging: false,
});

module.exports = sequelize;
