const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
          });
      
          const users = userData.map((project) => project.get({ plain: true }));
      
          res.render('homepage', {
            users,
            loggedIn: req.session.loggedIn,
          });
    } catch (error) {
        res.status(500).json(error);     
    }
});

router.get('/login', (req, res) => { //may have issues later due to naming
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;