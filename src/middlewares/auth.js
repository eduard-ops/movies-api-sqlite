const { createError } = require("../helpers");

const jwt = require("jsonwebtoken");

const { secretKey } = require("../config");

const authService = require("../api/auth/auth.service");

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    const { id } = jwt.verify(token, secretKey);
    const user = await authService.checkUserById(id);

    if (!user || !user.accessToken) {
      throw createError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
