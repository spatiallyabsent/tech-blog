const router = require('express').Router();
const { User } = require('../../models');


//CREATE A USER
router.post('/login', async (req, res) => {
  try {
    const  userData = await User.findOne({ where: {email: req.body.email } });
    if (!userData) {
      res
      .status(400)
      .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
      .status(400)
      .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;//loggedIn may need to be changed to logged_in check also utils.auth.js
      res.json({ user: userData, message: 'you are now logged in'});
    });

  } catch (error) {
    res.status(400).json(error); 
  }
});

//LOGOUT (req.session.destroy)
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;