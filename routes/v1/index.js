'use strict';
const express = require('express');
const router = express.Router();
const wrap = require('co-express');
const user = require('./user.router');
const Auth = require('../../helpers/auth.helper');

router.use('/user', user);

module.exports = router;
