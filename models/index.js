const Sequelize = require('../config/connection');
const Post = require('./Post');
const User = require('./User');
const UserComment = require('./UserComments');

User.hasMany(Post, { foreignKey: 'userId' });
User.hasMany(UserComment, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
UserComment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize: Sequelize,
    Post,
    User,
    UserComment
};
