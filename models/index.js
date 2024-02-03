const sequelize = require('../config/connection');
const Post = require('./Post');
const User = require('./User');
const UserComment = require('./UserComments');

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserComment, { foreignKey: 'userId' });
UserComment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(UserComment, {foreignKey: 'post_id'});
UserComment.belongsTo(Post, {foreignKey: 'post_id'});

module.exports = {
    sequelize,
    Post,
    User,
    UserComment
};
