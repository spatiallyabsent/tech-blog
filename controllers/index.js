const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
//still need to add the other api routes

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
//still need to add the other api routes

module.exports = router;