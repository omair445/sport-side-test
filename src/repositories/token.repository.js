// eslint-disable-next-line security/detect-non-literal-require
const { prisma } = require(`../config/prisma`);

const createUserToken = async (payload) => {
  return prisma.token.create({
    data: payload,
  });
};

module.exports = { createUserToken };
