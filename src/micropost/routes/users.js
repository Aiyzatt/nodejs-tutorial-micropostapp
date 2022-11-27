const express = require('express');
const knex = require('../db/knex');
const router = express.Router();
const globalConfig = require('../config/global');
const Util = require('../models/util');
const User = require('../models/user');
const Relationship = require('../models/relationship');
const Micropost = require('../models/micropost');

/* GET ユーザ一覧 */
router.get('/', async function(req, res, next) {
  const isAuth = req.isAuthenticated();

  if (!isAuth) { return res.redirect('/'); };

  const users = await User.getUsers();

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'ユーザ一覧',
    isAuth: isAuth,
    authUser: req.user,
    user: req.user,
    users: users,
  });
});

/* GET ユーザ詳細 */
router.get('/:userId', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.params.userId;

  if (!isAuth) { return res.redirect('/'); };

  const user = await User.getUsers(userId);

  if (Object.keys(user).length === 0) { return res.redirect('/'); };

  const microposts = await Micropost.getMicroposts(userId);
  const isFollowing = await Relationship.isFollowing(req.user.id, userId);

  res.render('index', {
    title: globalConfig.appName + ' | ' + 'ユーザ詳細',
    isAuth: isAuth,
    authUser: req.user,
    user: user,
    microposts: microposts,
    isFollowing: isFollowing,
  });
});

/* GET ユーザ詳細_フォローリスト */
router.get('/:userId/following', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.params.userId;

  if (!isAuth) { return res.redirect('/'); };

  const user = await User.getUsers(userId);

  if (Object.keys(user).length === 0) { return res.redirect('/'); };

  const users = await Relationship.getFollowings(userId);

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'フォロー中',
    params: req.params,
    isAuth: isAuth,
    authUser: req.user,
    user: user,
    users: users,
  });
});

/* GET ユーザ詳細_フォロワーリスト */
router.get('/:userId/followers', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.params.userId;

  if (!isAuth) { return res.redirect('/'); };

  const user = await User.getUsers(userId);

  if (Object.keys(user).length === 0) { return res.redirect('/'); };

  const users = await Relationship.getFollowers(userId);

  res.render('users', {
    title: globalConfig.appName + ' | ' + 'フォロワー',
    params: req.params,
    isAuth: isAuth,
    authUser: req.user,
    user: user,
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
      return res.redirect('/users');
    })
    .catch((error) => {
      req.flash('error', '削除ができませんでした: ' + error.sqlMessage);
      return res.redirect('/users');
    });
  }
});

/* POST フォロー */
router.post('/follow', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const posts = req.body;
  
  if (isAuth) {
    knex('relationships')
      .insert({
        follower_user_id: req.user.id,
        followed_user_id: posts.follower_user_id,
      })
      .then(() => {
        req.flash('success', 'フォローしました。');
        return res.redirect('/users/' + posts.follower_user_id);
      })
      .catch((error) => {
        req.flash('error', 'フォローできませんでした: ' + error.sqlMessage);
        return res.redirect('/users/' + posts.follower_user_id);
      });
  }
});

/* POST フォロー解除 */
router.post('/unfollow', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const posts = req.body;
  
  if (isAuth) {
    knex('relationships')
      .where({
        follower_user_id: req.user.id,
        followed_user_id: posts.follower_user_id,
      })
      .update({ deleted_at: await Util.getTimestomp(), })
      .then(() => {
        req.flash('success', 'フォローを解除しました。');
        return res.redirect('/users/' + posts.follower_user_id);
      })
      .catch((error) => {
        req.flash('error', 'フォローを解除できませんでした: ' + error.sqlMessage);
        return res.redirect('/users/' + posts.follower_user_id);
      });
  }
});

module.exports = router;
