const router = require('express').Router();
const { Post, UserComment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: UserComment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                model: User,
                attributes: ['username']
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('posts', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;