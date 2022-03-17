const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const sportsController = require('../../controllers/sports.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/list', auth(), sportsController.getSportsList);
router.post('/like', auth(), sportsController.manageSportLikes);
router.get('/liked/sports', auth(), sportsController.likedUserSports);
// router.post('/login', validate(authValidation.login), authController.login);

module.exports = router;
