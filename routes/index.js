'use strict';
const express = require('express');
const router = express.Router();
const apiV1 = require('./v1/');
/* GET home page. */
router.get('/', function(req, res) {
  res.end('ok');
});

router.use('/api/v1',apiV1)

module.exports = router;
