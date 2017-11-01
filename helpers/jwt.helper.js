const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.tokenSecret;
const sign = function (data) {
  if (!data) {
    throw ('unable to sign the jwt');
  }
  let token = jwt.sign({
    data: data
  }, secret, {
    expiresIn: '3500h'
  });
  return token;
};
const verify = function (token) {
  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    throw ({
      error: 'unable to validate the token',
      status: 403
    });
  }
  return decoded;
};
module.exports = {
  sign: sign,
  verify: verify
};
