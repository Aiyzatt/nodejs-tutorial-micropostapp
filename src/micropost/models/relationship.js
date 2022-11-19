const knex = require('../db/knex');
const TABLE_NAME = 'relationships';

async function getFollowings(userId) {
  const followings = await knex(TABLE_NAME)
    .join('users', 'users.id', '=', 'relationships.followed_user_id')
    .select('*')
    .where({
      follower_user_id: userId,
      'users.deleted_at': null,
      'relationships.deleted_at': null,
    });
  return followings;
}

async function getFollowers(userId) {
  const followers = await knex(TABLE_NAME)
    .join('users', 'users.id', '=', 'relationships.follower_user_id')
    .select('*')
    .where({
      followed_user_id: userId,
      'users.deleted_at': null,
      'relationships.deleted_at': null,
    });
  return followers;
}

module.exports = {
  getFollowings,
  getFollowers,
};