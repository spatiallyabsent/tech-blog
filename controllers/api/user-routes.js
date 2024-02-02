const router = require('express').Router();
const { User } = require('../../models');
//use this for

//CREATE A USER

//LOGIN (needs login, compare user email, compare user password, save for login sess)

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