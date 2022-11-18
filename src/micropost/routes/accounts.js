const express = require('express');
const router = express.Router();
const globalConfig = require('../config/global');
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.redirect('/');
});

/* GET ユーザ登録 */
router.get('/signup', function(req, res, next) {
  console.log(req.flash());
  res.render('accounts/signup', {
    title: globalConfig.appName + ' | ' + 'アカウント登録',
  });
});

/* POST ユーザ登録 */
router.post('/signup', function(req, res, next) {
  const posts = req.body;

  knex('users')
    .select('*')
    .where('username', posts.username)
    .then(async (results) => {
      if (results.length > 0) {
        req.flash('error', 'このユーザ名はすでに使われています。');
        res.redirect('/accounts/signup');
      } else if (posts.password !== posts.repassword) {
        req.flash('error', 'パスワードが一致しません。');
        res.redirect('/accounts/signup');
      } else {
        const hashedPassword = await bcrypt.hash(posts.password, 10);
        knex('users')
          .insert({
            username: posts.username,
            password: hashedPassword,
            email: posts.email,
            is_admin: 0,
          })
          .then((results) => {
            req.session.userid = results[0];
            res.redirect('/');
          })
          .catch((error) => {
            req.flash('error', 'ユーザ登録ができませんでした: ' + error.sqlMessage);
            res.redirect('/accounts/signup');
          });
      }
    })
    .catch((error) => {
      req.flash('error', 'ユーザ登録ができませんでした: ' + error.sqlMessage);
      res.redirect('/accounts/signup');
    });

});

/* GET ログイン */
router.get('/signin', function(req, res, next) {
  res.render('accounts/signin', {
    title: globalConfig.appName + ' | ' + 'ログイン',
  });
});

/* GET ユーザ設定 */
router.get('/settings', function(req, res, next) {
  res.render('accounts/settings', {
    title: globalConfig.appName + ' | ' + 'アカウント設定',
  });
});

module.exports = router;
