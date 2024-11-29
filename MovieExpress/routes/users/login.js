const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    // Logic for user login
    const expires_in = 60 * 60 * 24;
    const exp = Math.floor(Date.now() / 1000) + expires_in;
    const token = jwt.sign({ exp }, process.env.JWT_SECRET);
    res.send('User logged in successfully');
    res.status(200).json({
        token,
        token_type: "Bearer",
        expires_in
      });
});

module.exports = router;