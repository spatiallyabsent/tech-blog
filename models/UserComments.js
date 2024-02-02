const { Model, DataTyoes } = require('sequelize');
const Sequelize = require('../config/connection');

class UserComment extends Model {}

UserComment.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // complete this as we add more then delete this message
  }, {
    sequelize,
    modelName: 'user_comment'
  });
  
  module.exports = UserComment;