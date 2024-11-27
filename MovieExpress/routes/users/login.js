const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Logic for user login
    res.send('User logged in successfully');
});

module.exports = router;