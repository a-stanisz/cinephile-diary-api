const express = require('express');
const dbConnect = require('./database');

const PORT = process.env.MOVIES_SRV_PORT || 8080;

const DB_NAME = 'test';
dbConnect(DB_NAME);

// Test other modules if work:
// const omdb = require('./services/omdb');
// omdb('Hobbit');

const authsrv = require('./services/auth');
authsrv('basic-thomas', 'sR-_pcoow-27-6PAwCD8');

// 

const app = express();

app.get('/', (req, res, next) => {
  res.send(`Hello! It's intended to be the movie's service.`)
});

app.listen(PORT, () => {
  console.log(`movies svc running at port ${PORT}`);
});