var express = require('express');
var router = express.Router();
const globalConfig = require('../config/global');
const User = require('../models/user');

/* GET ユーザ一覧 */
router.get('/', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = (typeof req.user !== 'undefined') ? req.user.id : null;
  const userData = await User.findById(userId);

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'ユーザ一覧',
    isAuth: isAuth,
    userData: userData,
  });
});

/* GET ユーザ詳細 */
router.get('/:userId', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = (typeof req.user !== 'undefined') ? req.user.id : null;
  const userData = await User.findById(userId);

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'ユーザ詳細',
    params: req.params,
    isAuth: isAuth,
    userData: userData,
  });
});

/* GET ユーザ詳細_フォローリスト */
router.get('/:userId/following', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = (typeof req.user !== 'undefined') ? req.user.id : null;
  const userData = await User.findById(userId);

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'フォロー中',
    params: req.params,
    isAuth: isAuth,
    userData: userData,
  });
});

/* GET ユーザ詳細_フォロワーリスト */
router.get('/:userId/followers', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = (typeof req.user !== 'undefined') ? req.user.id : null;
  const userData = await User.findById(userId);

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'フォロワー',
    params: req.params,
    isAuth: isAuth,
    userData: userData,
  });
});

module.exports = router;
