const config = require('./config');
const mongoose = require('mongoose');
const es6Promise = require('es6-promise');
mongoose.Promise = es6Promise.Promise;
module.exports = function() {
  let db;
  db = mongoose.connect(config.db);
  require('./models/mongoose/user.server.model');
  return db;
};
