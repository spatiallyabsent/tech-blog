const { UserComment } = require('../models');

const commentData = [
    {
        content: 'But I need the clean code!',
        user_id: 2,
        post_id: 1,
    },
    {
        content: 'Someone had a bad day with a new hire I take it',
        user_id: 3,
        post_id: 2,
    },
    {
        content: 'Wish I could help you with that bud',
        user_id: 1,
        post_id: 3,
    },
];

const seedComments = () => UserComment.bulkCreate(commentData);

module.exports = seedComments;