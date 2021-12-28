const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./database/connect');

dbConnect();

// Provide fresh tokens to copy into sample requests for testing endpoints:
const auth = require('./services/auth');
(async () => {
  try {
    const basicUsrToken = await auth('basic-thomas', 'sR-_pcoow-27-6PAwCD8');
    const premiumUsrToken = await auth('premium-jim', 'GBLtTyq3E_UNjFnpo9m6');
    console.log('Copy following token for testing purposes: ', "'basic-thomas': ", basicUsrToken);
    console.log('Copy following token for testing purposes: ', "'premium-jim': ", premiumUsrToken);
  } catch(err) {
    console.error(err);
  }
})();
// 

const PORT = process.env.MOVIES_SRV_PORT || 8080;

const diaryRoutes = require('./routes/diary');
const app = express();

app.use(express.json());
app.use('/', diaryRoutes);

app.get('/', (req, res, next) => {
  res.send(`Hello! It's intended to be the movie's service.`)
});

app.listen(PORT, () => {
  console.log(`movies svc running at port ${PORT}`);
});