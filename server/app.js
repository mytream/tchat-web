const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

const apiFriend = require('./api/friend');
const apiChat = require('./api/chat');
app.use(apiFriend);
app.use(apiChat);

const port = process.env.PORT || 8080;

app.listen(port, function (err) {
  if (err) return console.log(err);
  console.log('Listening at http://localhost:' + port);
});
