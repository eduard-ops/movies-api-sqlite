const parceFile = (file) => {
  const multerText = file.buffer.toString("utf8");
  const regex =
    /Title: (?<title>.+)\nRelease Year: (?<year>\d+)\nFormat: (?<format>.+)\nStars: (?<stars>.+)/;
  const matches = multerText.match(new RegExp(regex, "g"));
  return matches.map((el) => el.match(regex).groups);
};

module.exports = parceFile;
