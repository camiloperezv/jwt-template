'use strict';
const express = require('express');
const wrap = require('co-express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const Auth = require('../../helpers/auth.helper');

router.post('/signup', wrap(UserController.signup));
router.post('/login', wrap(UserController.login));
router.put('/', Auth.validateToken, wrap(UserController.update));

module.exports = router;
