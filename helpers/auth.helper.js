'use strict';
const JWT = require('./jwt.helper');
module.exports = {
  validateToken: function (req, res, next) {
    let token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if(req.headers && req.headers.authorization.split(' ')[0] === 'Bearer' && req.headers.authorization.split(' ')[1]){
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(403).json({
        'error': 'unauthorized'
      });
    }
    try {
      let decoded = JWT.verify(token);
      if (!decoded.data) {
        return res.status(403).json({
          'error': 'unauthorized'
        });
      }
      req.user = decoded.data;
      next();
    } catch (e) {
      return res.json({
        error: 'unauthorized'
      }).status(403).end();
    }
  }
};
