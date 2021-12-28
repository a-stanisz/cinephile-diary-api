const User = require('../models/user');
const Movie = require('../models/movie');

exports.postMovie = async (req, res, next) => {
  if (!req.user || !req.movieData) {
    const error = new Error('Not Found!');
    error.statusCode = 404;
    throw error;
  }
  const userId = req.user.userId;
  const userName = req.user.userName;
  const userRole = req.user.userRole;
  try {
    let user;
    user = await User.findOne({ userId: userId });
    if (!user) {
      user = new User({
        userId: userId,
        userName: userName,
        userRole: userRole,
      });
      await user.save();
      console.log('Created new user');
    };
    user = await User.findOne({ userId: userId });
    const entry = {
      title: req.movieData.title,
      releaseDate: req.movieData.releaseDate,
      genre: req.movieData.genre,
      director: req.movieData.director,
    }
    const movieEntry = new Movie(entry);
    await movieEntry.save();
    user.diaryEntries.push(movieEntry);
    await user.save();
    res.status(200).json({
      userId: `${userId}`,
      message: `Dear ${userName}, movie: <<${entry.title}>> has been added to your Cinephile Diary!`,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getUserMovies = async (req, res, next) => {
  if (!req.user) {
    const error = new Error('Not Found!');
    error.statusCode = 404;
    throw error;
  }
  const userId = req.user.userId;
  const userName = req.user.userName;
  const userRole = req.user.userRole;
  try {
    let user;
    user = await User.findOne({ userId: userId });
    if (!user) {
      const error = new Error('User Not Found!');
      error.statusCode = 404;
      throw error;
    }
    // TODO: Create, based on ids in User document, array of movies and pass it as a response!
    let userMovies = [];
    console.log('movies table: ', userMovies);
    user.diaryEntries.forEach(async (movieObj) => {
      let movie = await Movie.findById({ _id: movieObj.toString() });
      userMovies.push(movie);
    });
    console.log('movies table: ', userMovies);
    res.status(200).json({
      userId: `${userId}`,
      userName: `${userName}`,
      userMovies: userMovies,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}