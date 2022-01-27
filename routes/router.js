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
    headers: ['User', 'Email'], // keys of shareholder object values
    shareholders: [{ id: 1, User: 'Mikky', Email: 'mikky@wevestr.com' }],
};

class DataService {
    data = {
        headers: ['User', 'Email'], // keys of shareholder object values
        shareholders: [{ id: 1, User: 'Mikky', Email: 'mikky@wevestr.com' }],
    };

    getShareholderById(idToFind) {
        return this.data.shareholders.find(({ id }) => id === idToFind);
    }

    getShareholders() {
        return this.data.shareholders; // possibly format?
    }

    getHeaders() {
        return this.data.headers; // possibly format?
    }

    getShareholdersXls() {
        return this.data.shareholders; // transform to xls
    }

    updateShareholders() {}

    getPreview(parsedFile) {
        return {
            existingHeaders: this.getHeaders(), // TODO To be changed
            parsedTable: parsedFile, // TODO To be changed
        };
    }
}

const dataService = new DataService();

router.get('/shareholders/:id', (req, res, next) => {
    res.status(200).send(dataService.getShareholderById(req.id));
});

router.get('/shareholders', (req, res, next) => {
    res.status(200).send(dataService.getShareholders());
});

router.get('/shareholders-xls', (req, res, next) => {
    res.status(200).send(dataService.getShareholdersXls()); // TODO send the file
});

router.post('/calculate-preview', (req, res, next) => {
    const parsedFile = [
        ['Name', 'Alex', 'Gleb'],
        ['e-mail address', 'alex@wevestr.com', 'gleb@wevestr.com'],
    ];
    res.status(200).send(dataService.getPreview(parsedFile));
});

router.post('/update-table', (req, res, next) => {
    dataService.updateShareholders();
    res.status(200).send(dataService.getShareholders());
});

module.exports = router;
