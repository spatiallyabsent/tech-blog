const router = require('express').Router();
const { UserComment, Post } = require('../../models');
const withAuth = require('../../utils/auth');
const { findByPk } = require('../models/UserComments');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await UserComment.create({
            content: req.body.content,
            userId: req.session.userId,
            postId: req.body.postId, //double check this if issues
        });
        res.status(200).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('./:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await UserComment.update(
            { content: req.body.content },
            { where: { id: req.params.id } }
        );
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await UserComment.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(deletedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;