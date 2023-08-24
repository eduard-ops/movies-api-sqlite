const express = require("express");

const router = express.Router();

const movieController = require("../../api/movie");

const { ctrlWrapper, validation, auth, upload } = require("../../middlewares");

const { movieSchema } = require("../../schemas");

router.get("/:id", auth, ctrlWrapper(movieController.getMovieInfo));

router.get("/", auth, ctrlWrapper(movieController.getMovieList));

router.post(
  "/",
  auth,
  validation(movieSchema.joiMovieAddSchema),
  ctrlWrapper(movieController.addMovie)
);

router.post(
  "/upload",
  auth,
  upload.single("file"),
  ctrlWrapper(movieController.uploadFile)
);

router.delete("/:id", auth, ctrlWrapper(movieController.deleteMovie));

module.exports = router;
