var express = require('express');
var router = express.Router();
const globalConfig = require('../config/global');

/* GET ユーザ一覧 */
router.get('/', function(req, res, next) {
  res.render('users', {
    title: globalConfig.appName + ' | ' + 'userlist',
  });
});

/* GET ユーザ詳細 */
router.get('/:userId', function(req, res, next) {
  res.render('users', {
    title: globalConfig.appName + ' | ' + 'profile',
    params: req.params,
  });
});

/* GET ユーザ詳細_フォローリスト */
router.get('/:userId/following', function(req, res, next) {
  res.render('users', {
    title: globalConfig.appName + ' | ' + 'following users',
    params: req.params,
  });
});

/* GET ユーザ詳細_フォロワーリスト */
router.get('/:userId/followers', function(req, res, next) {
  res.render('users', {
    title: globalConfig.appName + ' | ' + 'followers',
    params: req.params,
  });
});

module.exports = router;
