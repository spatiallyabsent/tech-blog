const { Model, DataTyoes } = require('sequelize');
const Sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    constent: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    //add more as needed
}, {
    sequelize,
    modelName: 'post'
});

module.exports = Post;
    