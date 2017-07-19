/**
 * Created by mytream on 17/7/19.
 */
const mongoose = require('./mongoose');

module.exports = function () {
  mongoose.connect('mongodb://localhost/tchat');
};