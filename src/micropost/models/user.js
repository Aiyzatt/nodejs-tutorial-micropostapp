const knex = require('../db/knex');
const TABLE_NAME = 'users';
const Relationship = require('./relationship');
const Micropost = require('./micropost');

async function getUsers(userId = null) {
  const selectColumns = ['id', 'username', 'email', 'is_admin', 'profile_image_uri', 'created_at'];
  if (userId) { // ID指定あり
    const user = await knex(TABLE_NAME)
      .select(selectColumns)
      .where({
        id: userId,
        deleted_at: null,
      });

      if (user.length === 0) { return {}; }

      // フォロー数、フォロワー数、つぶやき投稿数情報を追加
      const followCount = await Relationship.getFollowCount(userId);
      const micropostCount = await Micropost.getMicropostCount(userId);
      return {...user[0], ...followCount, ...micropostCount};

  } else { // ID指定なし(全ユーザ)
    const users = await knex(TABLE_NAME)
    .select(selectColumns)
      .where({
        deleted_at: null,
      });
    return users;
  }
}

module.exports = {
  getUsers,
};