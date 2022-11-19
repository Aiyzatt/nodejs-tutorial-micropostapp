var express = require('express');
var router = express.Router();
const globalConfig = require('../config/global');

/* GET ユーザ一覧 */
router.get('/', function(req, res, next) {
  const isAuth = req.isAuthenticated();

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'ユーザ一覧',
    isAuth: isAuth,
    userData: req.user,
  });
});

/* GET ユーザ詳細 */
router.get('/:userId', function(req, res, next) {
  const isAuth = req.isAuthenticated();

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'ユーザ詳細',
    params: req.params,
    isAuth: isAuth,
    userData: req.user,
  });
});

/* GET ユーザ詳細_フォローリスト */
router.get('/:userId/following', function(req, res, next) {
  const isAuth = req.isAuthenticated();

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'フォロー中',
    params: req.params,
    isAuth: isAuth,
    userData: req.user,
  });
});

/* GET ユーザ詳細_フォロワーリスト */
router.get('/:userId/followers', function(req, res, next) {
  const isAuth = req.isAuthenticated();

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'フォロワー',
    params: req.params,
    isAuth: isAuth,
    userData: req.user,
  });
});

module.exports = router;
