var express = require('express');
var router = express.Router();
var user = require('./data/user.json');

router.post('/login', function (req, res, next) {
  res.json({status: 0, message: null, data: user});
});

router.post('/logout', function (req, res, next) {
  res.json({status: 0, message: null, data: {}});
});

module.exports = router;