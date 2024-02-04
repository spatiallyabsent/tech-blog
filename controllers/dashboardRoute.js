const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

//get them posts
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            include: [{ model: Post }],
        });
        
        const user = userData.get({ plain: true });

        res.render('dashboard', {
            user,
            loggedIn: req.session.loggedIn,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
//get a post to edit
router.post('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('edit-post', {
            post, 
            loggedIn: req.session.loggedIn,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
});
//Post a new post
router.post('/new', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId,
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//Put for editing a new post
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(updatePost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;