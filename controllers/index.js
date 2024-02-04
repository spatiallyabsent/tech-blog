const router = require('express').Router();

const apiRoutes = require('./api');
const homePageRoute = require('./homepageRoute');
const dashboardRoute = require('./dashboardRoute');
//still need to add the other api routes

router.use('/', homePageRoute);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoute);
//still need to add the other api routes

module.exports = router;