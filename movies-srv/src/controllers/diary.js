// const DiaryRecord = require('../models/movie');
const User = require('../models/user');
const Movie = require('../models/movie');

exports.postMovie = async (req, res, next) => {
  if (!req.user || !req.movieData) {
    const error = new Error('Not Found!');
    error.statusCode = 404;
    throw error;
  }
  const userId = req.userId;
  const userName = req.userName;
  const userRole = req.userRole;
  try {
    let user;
    user = await User.findOne({userId: userId});
    if (!user) {
      user = new User({
        userId: userId,
        userName: userName,
        userRole: userRole,
      });
      await user.save();
      console.log('Created new user');
    };
    user = await User.findOne({userId: userId});
    const movieEntry = new Movie({
      title: req.movieData.title,
      releaseDate: req.movieData.releaseDate,
      genre: req.movieData.genre,
      director: req.movieData.director,
    });
    user.diaryEntries.push(movieEntry);
    await user.save();
    res.status(200).json({message: 'Database updated!'});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getUserMovies = async (req, res, next) => {
  try {

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}