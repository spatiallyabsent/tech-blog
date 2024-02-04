const router = require('express').Router();

const loginRoute = require('./loginRoute.js');

router.use('/users', loginRoute);

module.exports = router;