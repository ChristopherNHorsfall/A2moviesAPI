const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Logic for user registration
    res.send('User registered successfully');
});

module.exports = router;