const router = require('express').Router();

const apiRoutes = require('./api');
const homePageRoute = require('./homepageRoute');
//still need to add the other api routes

router.use('/', homePageRoute);
router.use('/api', apiRoutes);
//still need to add the other api routes

module.exports = router;