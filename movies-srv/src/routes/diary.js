const express = require('express');
const isAuth = require('../middleware/isAuth');
const getTokenData = require('../middleware/getTokenData');
const getTitleToSearch = require('../middleware/getTitleToSearch');
const getMovieData = require('../middleware/getMovieData');
const diaryController = require('../controllers/diary');

const router = express.Router();

router.post(
  '/movies',
  isAuth,
  getTokenData,
  getTitleToSearch,
  getMovieData,
  diaryController.postMovie
);

router.get('/movies', isAuth, diaryController.getUserMovies);

module.exports = router;