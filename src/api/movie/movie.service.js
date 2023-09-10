const { createError, parceFile } = require("../../helpers");
const { Op, fn, col } = require("sequelize");
const { Star, Movie } = require("../../models");

class MovieService {
  constructor() {
    this.Movie = Movie;
    this.Star = Star;
  }

  async addMovie(body) {
    const { title, year, format, stars } = body;

    const checkMovie = await Movie.findOne({ where: { title } });

    if (checkMovie) {
      throw createError(409, `Film with title: ${checkMovie.title} exists`);
    }

    const newMovie = await Movie.create({
      title,
      format,
      year,
    });

    for (const actorName of stars) {
      let actor = await Star.findOne({ where: { name: actorName } });

      if (!actor) {
        actor = await Star.create({ name: actorName });
      }

      await newMovie.addStar(actor);
    }

    const movieWithActors = await Movie.findByPk(newMovie.id, {
      include: {
        model: Star,
        as: "stars",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      attributes: ["id", "title", "format", "year"],
    });

    return movieWithActors;
  }

  async deleteMovie(id) {
    const movie = await Movie.findByPk(id);

    if (!movie) {
      throw createError(404, "Movie not found");
    }

    await movie.removeStars();

    await Movie.destroy({ where: { id: movie.id } });
  }

  async getMovieInfo(id) {
    const movie = await Movie.findByPk(id, {
      include: {
        model: Star,
        as: "stars",
        attributes: ["id", "name", "createdAt", "updatedAt"],
        through: { attributes: [] },
      },
      attributes: ["id", "title", "format", "year"],
    });

    if (!movie) throw createError(404, "Movie not found");

    return movie;
  }

  async getMovieList(params) {
    const {
      title,
      actor,
      sort = "id",
      order = "ASC",
      limit = 20,
      offset = 0,
    } = params;
    const filter = {};

    const includeOptions = [];

    if (title) {
      filter.title = { [Op.like]: `${title}%` };
    }

    if (actor) {
      includeOptions.push({
        model: Star,
        as: "stars",
        attributes: ["id", "name"],
        through: { attributes: [] },
        where: {
          name: { [Op.like]: `${params.actor}%` },
        },
      });
    }

    const d = await Movie.findAll({
      where: filter,
      include: includeOptions,
      order: [[(fn("LOWER"), col(sort)), order]],
      offset,
      limit,
    });
    return d;
  }

  async uploadFile(file) {
    if (!file) {
      throw createError(
        404,
        "The file is not in the correct format or is larger than 2 mb"
      );
    }

    const results = parceFile(file);

    const data = [];

    for (const film of results) {
      film.stars = film.stars.split(", ");
      data.push(await this.addMovie(film));
    }

    return data;
  }
}

module.exports = new MovieService();
