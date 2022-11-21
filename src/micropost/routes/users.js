const express = require('express');
const knex = require('../db/knex');
const router = express.Router();
const globalConfig = require('../config/global');
const Util = require('../models/util');
const User = require('../models/user');
const Relationship = require('../models/relationship');

/* GET ユーザ一覧 */
router.get('/', async function(req, res, next) {
  const isAuth = req.isAuthenticated();

  if (!isAuth) { return res.redirect('/'); };

  const users = await User.getUsers();

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'ユーザ一覧',
    isAuth: isAuth,
    userData: req.user,
    users: users,
  });
});

/* GET ユーザ詳細 */
router.get('/:userId', function(req, res, next) {
  const isAuth = req.isAuthenticated();

  if (!isAuth) { return res.redirect('/'); };

  res.render('index', {
    title: globalConfig.appName + ' | ' + 'ユーザ詳細',
    params: req.params,
    isAuth: isAuth,
    userData: req.user,
  });
});

/* GET ユーザ詳細_フォローリスト */
router.get('/:userId/following', async function(req, res, next) {
  const isAuth = req.isAuthenticated();

  if (!isAuth) { return res.redirect('/'); };

  const users = await Relationship.getFollowings(req.user.id);

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'フォロー中',
    params: req.params,
    isAuth: isAuth,
    userData: req.user,
    users: users,
  });
});

/* GET ユーザ詳細_フォロワーリスト */
router.get('/:userId/followers', async function(req, res, next) {
  const isAuth = req.isAuthenticated();

  if (!isAuth) { return res.redirect('/'); };

  const users = await Relationship.getFollowers(req.user.id);

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'フォロワー',
    params: req.params,
    isAuth: isAuth,
    userData: req.user,
    users: users,
  });
});

/* POST ユーザ削除 */
router.post('/delete', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const posts = req.body;
  
  if (isAuth && req.user.is_admin) {
    knex('users')
    .where({ id: posts.user_id, })
    .update({ deleted_at: await Util.getTimestomp(), })
    .then(() => {
      req.flash('success', '削除しました。');
      res.redirect('/users');
    })
    .catch((error) => {
      req.flash('error', '削除ができませんでした: ' + error.sqlMessage);
      res.redirect('/users');
    });
  }
});

module.exports = router;
