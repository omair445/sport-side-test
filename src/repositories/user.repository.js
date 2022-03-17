const crypto = require('crypto');
const { prisma } = require('../config/prisma');
const config = require('../config/config');

const createPasswordHash = (passwordString) => {
  return crypto.pbkdf2Sync(passwordString, config.jwt.secret, 1000, 64, `sha512`).toString(`hex`);
};

/**
 *
 * @param email
 * @returns {Promise<boolean>}
 */
const isEmailAlreadyTaken = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user !== null;
};

/**
 *
 * @param email
 * @returns {Promise<*>}
 */
const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

/**
 *
 * @param userId
 * @returns {Promise<*>}
 */
const findUserByID = async (userId) => {
  return prisma.user.findUnique({
    where: {
      userId,
    },
  });
};

/**
 *
 * @param payload
 * @returns {Promise<*>}
 */
const createUser = async (payload) => {
  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: createPasswordHash(payload.password),
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });
};

/**
 * @param user
 * @param password
 * @returns {Promise<boolean>}
 */
const verifyPassword = async (user, password) => {
  const hashPassword = crypto.pbkdf2Sync(password, config.jwt.secret, 1000, 64, `sha512`).toString(`hex`);
  return hashPassword === user.password;
};
module.exports = {
  isEmailAlreadyTaken,
  createPasswordHash,
  createUser,
  findUserByID,
  findUserByEmail,
  verifyPassword,
};
