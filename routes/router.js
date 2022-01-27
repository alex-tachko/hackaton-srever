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

const existingData = {
    headers: ['User', 'Email'],
    table: [
        ['User', 'Mikky'],
        ['Email', 'mikky@wevestr.com'],
    ],
};

router.get('/users', (req, res, next) => {
    res.status(200).send(existingData.table);
});

router.post('/calculate-preview', (req, res, next) => {
    res.status(200).send({
        existingHeaders: existingData.headers, // TODO To be changed
        parsedTable: [
            ['Name', 'Alex', 'Gleb'],
            ['e-mail address', 'alex@wevestr.com', 'gleb@wevestr.com'],
        ], // TODO To be changed
    });
});

module.exports = router;
