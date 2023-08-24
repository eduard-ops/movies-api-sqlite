const jwt = require("jsonwebtoken");

const { secretKey, expiresTime } = require("../config");

const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: expiresTime });
};

module.exports = generateToken;
