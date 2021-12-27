// const jwt = require('jsonwebtoken');
// const auth = require('../services/auth');

// const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    if (!req.tokenData) {
      const error = new Error('Not Found!');
      error.statusCode = 404;
      throw error;
    }
    req.userId = req.tokenData.userId;
    req.userName = req.tokenData.userName;
    req.userRole = req.tokenData.userRole;
    req.body = req.body;
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  next();
  }