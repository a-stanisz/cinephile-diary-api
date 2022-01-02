const axios = require('axios');
const { AUTH_HOST, AUTH_PORT } = process.env;

const getUserToken = async (username, password) => {
  try {
    const authURI = `http://${AUTH_HOST}:${AUTH_PORT}/auth`;
    const reqData = {
      username: username,
      password: password
    }
    const res = await axios.post(authURI, reqData);
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    return res.data;
  } catch (err) {
    console.log('Error: ', err.message);
  }
}

module.exports = getUserToken;