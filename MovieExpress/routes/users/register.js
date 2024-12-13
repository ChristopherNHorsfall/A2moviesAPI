const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {

    res.send('User registered successfully');
});

module.exports = router;