const express = require('express');
const dbConnect = require('./database/connect');
const resetLimitCounters = require('./workers/resetCounter');

dbConnect();

const PORT = process.env.MOVIES_SRV_PORT || 8080;

const diaryRoutes = require('./routes/diary');
const app = express();

app.use(express.json());
app.use('/', diaryRoutes);

app.get('/', (req, res, next) => {
  res.send('You are accessing the root route of the movie-srv. Hello!')
});

app.listen(PORT, () => {
  console.log(`movies svc running at port ${PORT}`);
});

resetLimitCounters();