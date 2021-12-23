const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res, next) => {
  res.send(`Hello! It's intended to be the movie's service.`)
});

app.listen(PORT, HOST, () => {
  console.log(`movies srv running at http://${HOST}:${PORT}`);
});
