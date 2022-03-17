const { prisma } = require('../config/prisma');

const getToken = async (token) => {
  return prisma.token.findFirst({
    where: {
      token,
    },
  });
};

const auth = () => async (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (headerToken === undefined) {
    res.status(401).send({ message: 'Unauthorised' });
  }
  const tokenObject = await getToken(headerToken);
  if (!tokenObject) {
    res.status(401).send({ message: 'Invalid Token Provided' });
  } else {
    req.userId = tokenObject.userId;
    next();
  }
};

module.exports = auth;
