const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authorization = require("../../middleware/authorization");

router.post('/', (req, res, next) => {

    const expires_in = 60 * 60 * 24;
    const exp = Math.floor(Date.now() / 1000) + expires_in;
    const token = jwt.sign({ exp }, process.env.JWT_SECRET);
    
    res.status(200).json({
        message: "User logged in successfully",
        token,
        token_type: "Bearer",
        expires_in
      });
});

module.exports = router;