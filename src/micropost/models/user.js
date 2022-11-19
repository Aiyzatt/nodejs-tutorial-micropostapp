const knex = require('../db/knex');
const TABLE_NAME = 'users';

async function getUsers() {
  const users = await knex(TABLE_NAME)
    .select('*')
    .where({deleted_at: null});
  return users;
}

async function findById(userId) {
  const user = await where({id: userId});
  return {...user};
}

async function where(condition) {
  return await knex(TABLE_NAME)
    .where(condition)
    .then((results) => {
      if(results.length === 0) {
        return null;
      }
      return results[0];
    });
}

module.exports = {
  findById,
  getUsers,
};