const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param email
 * @param password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await userService.isPasswordMatch(user, password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};
