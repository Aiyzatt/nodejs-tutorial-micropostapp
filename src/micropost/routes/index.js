const express = require('express');
const router = express.Router();
const globalConfig = require('../config/global');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: globalConfig.appName + ' | ' + 'トップページ' });
});

router.use('/users', require('./users'));
router.use('/accounts', require('./accounts'));
router.use('/logout', require('./logout'));

module.exports = router;
