const environment = 'development';
const config = require('../config/knexfile.js')[environment];
const knex = require('knex')(config);

module.exports = knex;