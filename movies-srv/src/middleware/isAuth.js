const jwt = require('jsonwebtoken');
const auth = require('../services/auth');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    console.log(authHeader);
    if (!authHeader) {
      const error = new Error('Unauthorized!');
      error.statusCode = 401;
      throw error;
    }
    const providedToken = authHeader.split(' ')[1];
    const authToken = await auth('basic-thomas', 'sR-_pcoow-27-6PAwCD8');
    let decodedToken;
    decodedToken = jwt.verify(String(providedToken), JWT_SECRET);
    if (!decodedToken) {
      const error = new Error('Unauthorized!');
      error.statusCode = 401;
      throw error.message;
    }
    // console.log(decodedToken);
    req.body = req.body;
    req.tokenData = decodedToken;
  } catch (err) {
    err.statusCode = 500;
    throw err;
  };
  next();
}