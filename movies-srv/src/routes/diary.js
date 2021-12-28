const express = require('express');
const isAuth = require('../middleware/isAuth');
const getUserData = require('../middleware/getUserData');
const getTitleToSearch = require('../middleware/getTitleToSearch');
const getMovieData = require('../middleware/getMovieData');
const diaryController = require('../controllers/diary');

const router = express.Router();

router.post(
  '/movies',
  isAuth,
  getUserData,
  getTitleToSearch,
  getMovieData,
  diaryController.postMovie
);

router.get(
  '/movies',
  isAuth,
  getUserData,
  diaryController.getUserMovies);

module.exports = router;