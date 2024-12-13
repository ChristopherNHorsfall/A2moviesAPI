const express = require('express');
const registerRoute = require('./register');
const loginRoute = require('./login');

const jwt = require('jsonwebtoken');
const router = express.Router();

router.use('/register', registerRoute);
router.use('/login', loginRoute);

router.get('/', (req, res) => {
    console.log('Test Route - Request Details:');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Mode:', req.get('Sec-Fetch-Mode'));
    res.send('users/index Route works');
});

module.exports = router;