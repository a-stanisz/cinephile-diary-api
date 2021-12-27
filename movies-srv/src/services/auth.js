const axios = require('axios');
// const { json } = require('express');
const { AUTH_HOST, AUTH_PORT } = process.env;

const getUserToken = (username, password) => {
  const authURI = `http://${AUTH_HOST}:${AUTH_PORT}/auth`;
  // const authURI = 'http://auth-srv:3002/auth'
  // console.log(authURI);
  const data = {
    username: username,
    password: password
  }
  axios.post(authURI, data)
  // axios({
  //   method: 'post',

  //   // headers: { 'Content-Type': 'application/json' },
  //   url: authURI,

  //   data: data
  // })
    .then(res => {
      const headerDate = res.headers && res.headers.date ? res.headers.date: 'no response date';
      console.log('Status Code:', res.status);
      console.log('Date in Response header:', headerDate);
      // const data = res.data;
      // console.log(data);
      return res.data;
    }).catch(err => console.log('Error: ', err.message));
}

module.exports = getUserToken;