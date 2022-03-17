const sportsService = require('../services/sports.service');
const catchAsync = require('../utils/catchAsync');

const getSportsList = catchAsync(async (req, res) => {
  const sports = await sportsService.getSportsListFromDecathlon(req.userId);
  res.send({ sports });
});

const manageSportLikes = catchAsync(async (req, res) => {
  const response = await sportsService.syncSportLikes(req.body.sportsId, req.userId, req.body.isLike, req.body.sportsName);
  res.send({ response });
});

const likedUserSports = catchAsync(async (req, res) => {
  const response = await sportsService.likedUserSports(req.userId);
  res.send({ response });
});

module.exports = { getSportsList, manageSportLikes, likedUserSports };
