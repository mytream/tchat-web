const router = require('koa-router')();

router.post('/friends', function (req, res, next) {
  res.json({code: 0, message: null, data: friends});
});

router.post('/logout', function (req, res, next) {
  res.json({code: 0, message: null, data: {}});
});

module.exports = router.routes();