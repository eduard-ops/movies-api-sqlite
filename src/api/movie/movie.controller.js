const movieService = require("./movie.service");

class MovieController {
  constructor() {
    this.movieService = movieService;
  }

  async addMovie(req, res) {
    const data = await movieService.addMovie(req.body);
    return res.json({ message: "success", data });
  }

  async deleteMovie(req, res) {
    const { id } = req.params;
    await movieService.deleteMovie(+id);
    res.json({ message: "Movie deleted" });
  }

  async getMovieInfo(req, res) {
    const { id } = req.params;
    const data = await movieService.getMovieInfo(+id);
    res.json({ message: "success", data });
  }

  async getMovieList(req, res) {
    const data = await movieService.getMovieList(req.query);
    res.json({ message: "success", data });
  }

  async uploadFile(req, res) {
    const data = await movieService.uploadFile(req.file);
    res.json({ data });
  }
}

module.exports = new MovieController();
