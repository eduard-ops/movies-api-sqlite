const express = require("express");

const router = express.Router();

const authController = require("../../api/auth");

const { ctrlWrapper, validation, auth } = require("../../middlewares");

const { userSchema } = require("../../schemas");

router.post(
  "/register",
  validation(userSchema.joiUserRegisterSchema),
  ctrlWrapper(authController.registration)
);

router.post(
  "/login",
  validation(userSchema.joiUserLoginSchema),
  ctrlWrapper(authController.login)
);

router.get("/logout", auth, ctrlWrapper(authController.logout));

module.exports = router;
