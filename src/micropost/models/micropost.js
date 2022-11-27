const knex = require('../db/knex');
const TABLE_NAME = 'microposts';

async function getMicroposts(userId = null) {
  const selectColumns = [
    'microposts.id as id',
    'content',
    'user_id',
    'username',
    'profile_image_uri',
    'microposts.created_at as created_at'
  ];
  let microposts = [];
  
  if (userId) {
    microposts = await knex(TABLE_NAME)
      .join('users', 'users.id', '=', 'microposts.user_id')
      .select(selectColumns)
      .where({
        user_id: userId,
        'users.deleted_at': null,
        'microposts.deleted_at': null,
      })
      .orderBy('microposts.id', 'desc');
  } else { // user_id指定なし全件取得
    microposts = await knex(TABLE_NAME)
      .join('users', 'users.id', '=', 'microposts.user_id')
      .select(selectColumns)
      .where({
        'users.deleted_at': null,
        'microposts.deleted_at': null,
      })
      .orderBy('microposts.id', 'desc');
  }
  
  return microposts;
}

async function getMicropostCount(userId) {
  const micropostCount = await knex(TABLE_NAME)
    .count('id as micropostCount')
    .where({
      user_id: userId,
      deleted_at: null,
    });
  return {...micropostCount[0]};
}

module.exports = {
  getMicroposts,
  getMicropostCount,
};