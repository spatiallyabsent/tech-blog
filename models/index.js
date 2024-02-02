const Sequelize = require('../config/connection');
const Post = require('./Post');
const User = require('./User');
const UserComment = require('./UserComment');

// here we need to define associations between models (delete once done)

module.exports = {
    sequelize, 
    Post,
    User,
    UserComment
};
