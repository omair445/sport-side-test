const axios = require('axios');
const { prisma } = require('../config/prisma');

const isUserLikedSport = async (userId, sportsId) => {
  const data = await prisma.likes.findFirst({
    where: {
      userId,
      sportsId,
    },
  });
  if (data) {
    return data;
  }
  return false;
};

const getSportsListFromDecathlon = async (userId) => {
  const data = await axios.get('https://sportplaces.api.decathlon.com/api/v1/sports');
  const response = [];

  for (let i = 0; i < data.data.length; i++) {
    const sport = await isUserLikedSport(userId, data.data[i].id);

    response.push({
      id: data.data[i].id,
      name: data.data[i].name,
      isLiked: !!sport,
      sportName: sport.sportName,
    });
  }
  return response;
};

const syncSportLikes = async (sportsId, userId, isLike = false, sportsName = 'not available') => {
  const like = await prisma.likes.findFirst({
    where: {
      userId,
      sportsId,
    },
  });
  if (!like && isLike) {
    return prisma.likes.create({
      data: {
        userId,
        sportsId,
        sportsName,
      },
    });
  }
  return prisma.likes.deleteMany({
    where: {
      userId,
      sportsId,
    },
  });
};

const likedUserSports = async (userId) => {
  return prisma.likes.findMany({
    where: {
      userId,
    },
  });
};

module.exports = { getSportsListFromDecathlon, syncSportLikes, likedUserSports };
