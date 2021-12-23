const express = require('express');
const db = require('./db-access')

const PORT = 8080;
const HOST = '0.0.0.0';

const { MONGO_INITDB_ROOT_USERNAME } = process.env;
const { MONGO_INITDB_ROOT_PASSWORD } = process.env;
const DB_HOST = 'localhost';
const DB_PORT = 27017;
const DB_NAME = 'test';

const app = express();

app.get('/', (req, res, next) => {
  res.send(`Hello! It's intended to be the movie's service.`)
});

db.connect(
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
);
app.listen(PORT, HOST, () => {
  console.log(`movies svc running at http://${HOST}:${PORT}`);
});
