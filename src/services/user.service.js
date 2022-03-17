const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const UserRepo = require('../repositories/user.repository');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const isExist = await UserRepo.isEmailAlreadyTaken(userBody.email);
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return UserRepo.createUser(userBody);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return UserRepo.findUserByID(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return UserRepo.findUserByEmail(email);
};

/**
 *
 * @param user
 * @param password
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async (user, password) => {
  return UserRepo.verifyPassword(user, password);
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  isPasswordMatch,
};
