const express = require('express');
const router = express.Router();

/**
 * HTTP Status Codes: https://developer.mozilla.org/de/docs/Web/HTTP/Status
 */

// log requests
router.use('*', (req, res, next) => {
    console.log(`\x1b[32m${req.method}\x1b[35m ${req.baseUrl}`);
    next();
});

router.get('/get', (req, res, next) => {
    res.status(200).send('table');
});

module.exports = router;
