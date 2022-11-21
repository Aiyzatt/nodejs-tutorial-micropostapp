const express = require('express');
const router = express.Router();
const globalConfig = require('../config/global');
const Microposts = require('../models/micropost');


/* GET home page. */
router.get('/', async function(req, res, next) {
  const isAuth = req.isAuthenticated();

  if (!isAuth) {
    res.render('index', {
      title: globalConfig.appName + ' | ' + 'トップページ',
      isAuth: isAuth,
    });
  } else {
    const microposts = await Microposts.getMicroposts();
    res.render('index', {
      title: globalConfig.appName + ' | ' + '最新のつぶやき',
      isAuth: isAuth,
      userData: req.user,
      microposts: microposts,
      isPostable: true,
    });
  }
});

router.use('/users', require('./users'));
router.use('/accounts', require('./accounts'));
router.use('/microposts', require('./microposts'));
router.use('/logout', require('./logout'));

module.exports = router;
