const express = require('express');
const morgan = require('morgan');
const dbConnect = require('../database');

const DB_NAME = 'test';
dbConnect(DB_NAME);

const app = express();

app.use(morgan('common'));

app.get('/', (req, res, next) => {
  res.send(`Hello! It's intended to be the movie's service.`)
});

module.exports = app;