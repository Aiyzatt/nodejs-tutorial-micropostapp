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

/*
followingUserId: フォローする側
folloewedUserId: フォロー判定される側
*/
async function isFollowing(followingUserId, folloewedUserId) {
  const result = await knex(TABLE_NAME)
    .select('*')
    .where({
      follower_user_id: followingUserId,
      followed_user_id: folloewedUserId,
      'deleted_at': null,
    });
  return result.length > 0 ? true : false;
}

async function getFollowCount(userId) {
  const followingCount = await knex(TABLE_NAME)
    .count('id as followingCount')
    .where({
      follower_user_id: userId,
      deleted_at: null,
    });

  const followerCount = await knex(TABLE_NAME)
    .count('id as followerCount')
    .where({
      followed_user_id: userId,
      deleted_at: null,
    });
  return {...followingCount[0], ...followerCount[0]};
}

module.exports = {
  getFollowings,
  getFollowers,
  isFollowing,
  getFollowCount,
};