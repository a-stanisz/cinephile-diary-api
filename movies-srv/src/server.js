const express = require('express');
const dbConnect = require('./database');

const PORT = process.env.MOVIES_SRV_PORT || 8080;
// const HOST = '0.0.0.0';

const DB_NAME = 'test';
dbConnect(DB_NAME);

const app = express();

app.get('/', (req, res, next) => {
  res.send(`Hello! It's intended to be the movie's service.`)
});

app.listen(PORT, () => {
  console.log(`movies svc running at port ${PORT}`);
});