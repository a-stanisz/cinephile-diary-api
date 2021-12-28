const omdb = require('../services/omdb');

module.exports = async (req, res, next) => {
  try {
    // It would be better to get these from Schema!
    const movieProps = [
      'title',
      'releaseDate',
      'genre',
      'director'
    ];
    const movieToSearch = req.searchStr;
    const movieData = await omdb(movieToSearch);
    console.log(movieData);
    console.log(typeof movieData);
    console.log(movieData == true);
    if (!movieData.Title) {
      const error = new Error('Not Found!');
      error.statusCode = 404;
      throw error.message;
    }
    req.movieData = {
      title: movieData.Title,
      releaseDate: movieData.Released,
      genre: movieData.Genre,
      director: movieData.Director,
    };
  } catch (err) {
    err.statusCode = 500;
    throw err;
  };
  next();
}