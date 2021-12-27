const express = require('express');
const dbConnect = require('./database/connect');

const DB_NAME = 'movies';
dbConnect(DB_NAME);

const PORT = process.env.MOVIES_SRV_PORT || 8080;

// Retrieve valid tokens:
const auth = require('./services/auth');
const getTokens = async () => {
  try {
    const basicUser = {
      username: 'basic-thomas',
      password: 'sR-_pcoow-27-6PAwCD8',
      }
    const premiumUser = {
      username: 'premium-jim',
      password: 'GBLtTyq3E_UNjFnpo9m6',
    }
    basicUser.token = await auth(basicUser.username, basicUser.password);
    console.log(basicUser);
    premiumUser.token = await auth(premiumUser.username, premiumUser.password);
    console.log(premiumUser);
    } catch (err) {
      console.log('Error: ', err.message);
    }
}
getTokens();



// const movieProps = [
//   'title',
//   'releaseDate',
//   'genre',
//   'director'
// ];

// const omdb = require('./services/omdb');
// omdb('The Last Duel', [...movieProps])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));
  
// const auth = require('./services/auth');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const { JWT_SECRET } = process.env;

const decode = async () => {
  let decodedToken;
  try {
    const token = await auth('basic-thomas', 'sR-_pcoow-27-6PAwCD8');
    decodedToken = jwt.verify(String(token.token), JWT_SECRET)
    // console.log(typeof String(token.token), String(token.token));
  } catch (err) {
    console.log('Error: ', err.message);
  }
  console.log(decodedToken.userId);
}

// decode();
  // .then(res => console.log(res))
  // .catch(err => console.log(err));
  

// const getDecodedToken = async () => {
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify()
//   } catch (err) {
//     console.log('Error: ', err.message);
//   }
// }

// const token = require('./middleware/isAuth');
// token();



// 
const diaryRoutes = require('./routes/diary');
const isAuth = require('./middleware/isAuth');
const app = express();

app.use('/', diaryRoutes);

app.get('/', (req, res, next) => {
  res.send(`Hello! It's intended to be the movie's service.`)
});

app.listen(PORT, () => {
  console.log(`movies svc running at port ${PORT}`);
});

// const resul2 = authsrv.getUserToken('basic-thomas', 'sR-_pcoow-27-6PAwCD8');
// console.log(typeof resul2, resul2);