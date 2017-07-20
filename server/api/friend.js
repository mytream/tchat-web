const router = require('koa-router')();

const mongoose = require('../common/mongoose');
const FriendSchema = require('../schemas/Friend');
const Friend = mongoose.model('Friend', FriendSchema);

// 首页
router.get('/', async function (ctx, next) {;
  ctx.body = 'sever response'
});

router.get('/friend/list', async function (ctx, next) {

  try {
    let friends = await Friend.find().exec();

    console.log('friends', friends);

    ctx.body = {
      code: '0',
      message: null,
      data: friends
    };
  } catch (e) {
    console.error(e);
    ctx.body = 'error';
  }
});

router.get('/friend/one', async function (ctx, next) {
  let db = await mongoose.createConnection('mongodb://localhost/tchat', {
    useMongoClient: true,
    /* other options */
  });

  const CatSchema = mongoose.Schema({ name: String });

  CatSchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Cat = db.model('Cat', CatSchema);

  let cat = await Cat.findOne().exec();
  // console.log('cat', cat);
  cat.speak();

  let cats = await Cat.find().exec();
  // console.log('cat', cat);
  // cats.speak();
  console.log('cats -- ', cats)

  ctx.body = JSON.stringify(cats);
});

module.exports = router.routes();