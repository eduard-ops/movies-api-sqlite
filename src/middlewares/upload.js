const multer = require("multer");

const memoryStorage = multer.memoryStorage();

const fileFilter = (_, file, cb) => {
  const allowedMimes = ["text/plain"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  }

  cb(null, false);
};

const upload = multer({
  storage: memoryStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = upload;
