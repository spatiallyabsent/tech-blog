const router = require('express').Router();

const apiRoutes = require('./api');
const homePageRoute = require('./homepageRoute');
const dashboardRoute = require('./dashboardRoute');
const postsRoute = require('./postsRoute');
const commentsRoute = require('./commentsRoute');
//still need to add the other api routes

router.use('/', homePageRoute);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoute);
router.use('./posts', postsRoute);
router.use('./comments', commentsRoute);
//still need to add the other api routes

module.exports = router;