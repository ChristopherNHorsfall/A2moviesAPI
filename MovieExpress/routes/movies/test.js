const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Test Route - Request Details:');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Mode:', req.get('Sec-Fetch-Mode'));
    res.send('Route works');
});

module.exports = router;