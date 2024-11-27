const express = require('express');
const registerRoute = require('./register');
const loginRoute = require('./login');

const router = express.Router();

router.use('/register', registerRoute);
router.use('/login', loginRoute);

module.exports = router;