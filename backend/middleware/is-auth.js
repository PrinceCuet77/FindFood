const jwt = require('jsonwebtoken');

const JWT_KEY = 'somesupersecretlongstring';

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1]; // Fetching the jwt token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_KEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
