const router = require('express').Router();
const { User } = require('../../models');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


//CREATE A USER
router.post('/signup', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const  existingUser = await User.findOne({ where: {email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
   
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;
      res.json({ user: newUser, message: 'you are now logged in'});
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ message: 'Server error' }); 
  }
});
//update password route
router.put('/update-password', async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    await user.update({ password: hashedNewPassword});
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
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