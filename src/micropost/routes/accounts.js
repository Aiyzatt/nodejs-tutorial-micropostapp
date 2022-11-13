const express = require('express');
const router = express.Router();
const globalConfig = require('../config/global');

router.get('/', function(req, res, next) {
  res.redirect('/');
});

/* GET ユーザ登録 */
router.get('/signup', function(req, res, next) {
  res.render('accounts/signup', {
    title: globalConfig.appName + ' | ' + 'signup',
  });
});

/* GET ログイン */
router.get('/signin', function(req, res, next) {
  res.render('accounts/signin', {
    title: globalConfig.appName + ' | ' + 'signin',
  });
});

/* GET ユーザ設定 */
router.get('/settings', function(req, res, next) {
  res.render('accounts/settings', {
    title: globalConfig.appName + ' | ' + 'settings',
  });
});

module.exports = router;
