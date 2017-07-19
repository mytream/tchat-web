/**
 * Created by mytream on 17/7/19.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/tchat', {
  useMongoClient: true
});

module.exports = mongoose;