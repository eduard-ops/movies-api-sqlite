const dotenv = require("dotenv");

dotenv.config();

const {
  PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  SECRET_KEY,
  EXPIRES_TIME,
} = process.env;

module.exports = {
  serverPort: PORT,
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  secretKey: SECRET_KEY,
  expiresTime: EXPIRES_TIME,
  dbHost: DB_HOST,
};
