'use strict';

const express = require('express');
const router = express.Router();
// const { tokenValidator } = require('../middlewares/validateToken.middleware');

// router.use('/auth', require('../controllers/auth/auth.router'));

// router.use(tokenValidator);

router.use(
    '/incidents',
    require('./../controllers/incidents/incidents.router'),
);

module.exports = router;
