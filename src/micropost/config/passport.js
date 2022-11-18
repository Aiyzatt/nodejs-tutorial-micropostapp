const passport = require('passport');
const LocalStrategy = require('passport-local');
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const expressSession = require('express-session');
const secret = 'Ca3VMru5XJYBFYWg';

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    knex('users')
    .select('*')
    .where({
      name: username,
    })
    .then(async (results) => {
      if(results.length === 0) {
        return done(null, false, {message: 'ユーザ名かパスワード、またはその両方に誤りがあります'});
      } else { // 認証OKの場合
        if(await bcrypt.compare(password, results[0].password)) {
          return done(null, results[0]);
        } else {
          return done(null, false, {message: 'ユーザ名かパスワード、またはその両方に誤りがあります'});
        }
      }
    })
    .catch((error) => {
      console.log(error);
      return done(null, false, {message: error.toString()});
    });
  }));

  // Cookie session
  app.use(
    expressSession({
      name: 'session',
      secret: secret,
      resave: false,
      saveUninitialized: true,
      // Cookie Options
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      }
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
};