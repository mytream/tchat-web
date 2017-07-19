const express = require('express');
const router = express.Router();
const user = require('./data/user.json');
const friends = require('./data/friends.json');

router.post('/friends', function (req, res, next) {
  res.json({code: 0, message: null, data: friends});
});

router.post('/logout', function (req, res, next) {
  res.json({code: 0, message: null, data: {}});
});

module.exports = router;