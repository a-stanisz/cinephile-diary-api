// const mongoose = require('mongoose');
const omdb = require('../services/omdb');

module.exports = async (req, res, next) => {
  try {
  // Get these from Schema!
  const movieProps = [
    'title',
    'releaseDate',
    'genre',
    'director'
  ];
  const movieToSearch = req.movie.searchStr;
  const movieData = await omdb(movieToSearch, [...movieProps]);
  console.log(movieData);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  };
  if (!movieData) {
    const error = new Error('Not Found!');
    error.statusCode = 404;
    throw error.message;
  }
  // console.log(decodedToken);
  // console.log(movieData);
  req.movieData = movieData;
  next();
  }




// module.exports = async (req, res, next) => {
//   try {
//     if (!req.tokenData) {
//       const error = new Error('Not Found!');
//       error.statusCode = 404;
//       throw error;
//     }
//     req.user.id = req.tokenData.userId;
//     req.user.name = req.tokenData.userName;
//     req.user.role = req.tokenData.userRole;
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   next();
//   }