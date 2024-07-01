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

// Job----
// import {
//   UnauthenticatedError,
//   UnauthorizedError,
//   BadRequestError,
// } from '../errors/customErrors.js';
// import { verifyJWT } from '../utils/tokenUtils.js';

// export const authenticateUser = (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) throw new UnauthenticatedError('authentication invalid');

//   try {
//     const { userId, role } = verifyJWT(token);
//     const testUser = userId === '64b2c07ccac2efc972ab0eca';
//     req.user = { userId, role, testUser };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError('authentication invalid');
//   }
// };

// export const authorizePermissions = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       throw new UnauthorizedError('Unauthorized to access this route');
//     }
//     next();
//   };
// };

// export const checkForTestUser = (req, res, next) => {
//   if (req.user.testUser) throw new BadRequestError('Demo User. Read Only!');
//   next();
// };
