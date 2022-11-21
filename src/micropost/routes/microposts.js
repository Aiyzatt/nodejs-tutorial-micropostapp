const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Util = require('../models/util');

/* POST つぶやき投稿 */
router.post('/add', function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const posts = req.body;

  if (isAuth && req.user.id) {
    knex('microposts')
      .insert({
        content: posts.content,
        user_id: req.user.id,
      })
      .then((result) => {
        req.flash('success', '投稿しました。');
        return res.redirect('/');
      })
      .catch((error) => {
        req.flash('error', '投稿ができませんでした: ' + error.sqlMessage);
        return res.redirect('/');
      }); 
  } else {
    req.flash('error', '投稿ができませんでした。');
    return res.redirect('/');
  }
});

/* POST つぶやき削除 */
router.post('/delete', async function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const posts = req.body;

  if (isAuth && req.user.id) {
    knex('microposts')
      .where(req.user.is_admin ? {} : {user_id: req.user.id}) // adminユーザの場合はどのユーザの投稿でも削除可能
      .where('id', '=', posts.micropost_id)
      .update({
        deleted_at: await Util.getTimestomp(),
      })
      .then((result) => {
        req.flash('success', '削除しました。');
        return res.redirect('/');
      })
      .catch((error) => {
        req.flash('error', '削除できませんでした: ' + error.sqlMessage);
        return res.redirect('/');
      }); 
  } else {
    req.flash('error', '削除できませんでした。');
    return res.redirect('/');
  }
});

module.exports = router;