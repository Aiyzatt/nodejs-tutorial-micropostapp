const express = require('express');
const router = express.Router();
const globalConfig = require('../config/global');
const User = require('../models/user');


/* GET home page. */
router.get('/', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = (typeof req.user !== 'undefined') ? req.user.id : null;
  const userData = await User.findById(userId);

  res.render('index', {
    title: globalConfig.appName + ' | ' + 'トップページ',
    isAuth: isAuth,
    userData: userData,
  });
});

router.use('/users', require('./users'));
router.use('/accounts', require('./accounts'));
router.use('/logout', require('./logout'));

module.exports = router;
