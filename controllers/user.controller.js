'use strict';
const User = require('../models/user.model');
const signup = function* (req, res) {
  try {
    let jwt = yield User.signup(req.body.name, req.body.email, req.body.password, req.body.mobile, req.body.password, req.body.city, req.body.department, req.body.country, 'local');
    return res.json({
      data: jwt
    }).end();
  } catch (e) {
    return res.status(e.status || 405).json({
      error: e.error || 'unable to create the user',
    }).end();
  }
};

const login = function* (req, res) {
  try {
    let jwt = yield User.login(req.body.email, req.body.password)
    return res.json({
      data: jwt,
    }).end();
  } catch (e) {
    return res.status(e.status || 403).json({
      error: e.error || 'unauthorized',
    }).end();
  }
};

const update = function*(req,res){
  try {
    let updatedUser = yield User.update(req.user.id, req.body.name, req.body.mobile, req.body.address, req.body.city, req.body.department, req.body.country, req.body.password);
    return res.json(updatedUser).end()
  } catch (e) {
    return res.status(e.status || 405).json({
      error: e.error || 'unable to edit this user',
    }).end();
  }
};
module.exports = {
  signup: signup,
  login: login,
  update: update
};
