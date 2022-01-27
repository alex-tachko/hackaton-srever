const express = require('express');
const router = express.Router();

var http = require('http');
var XLSX = require('xlsx');
var formidable = require('formidable');

/**
 * HTTP Status Codes: https://developer.mozilla.org/de/docs/Web/HTTP/Status
 */

// log requests
router.use('*', (req, res, next) => {
    console.log(`\x1b[32m${req.method}\x1b[35m ${req.baseUrl}`);
    next();
});

class DataService {
    data = {
        headers: ['User', 'Email'], // keys of shareholder object values
        shareholders: [{ id: 1, User: 'Mikky', Email: 'mikky@wevestr.com' }],
    };

    getShareholderById(idToFind) {
        return this.data.shareholders.find(({ id }) => id === idToFind);
    }

    getShareholders() {
        return this.data.shareholders;
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
    res.status(200).send({
        shareholders: dataService.getShareholders(),
        headers: dataService.getHeaders(),
    });
});

router.get('/shareholders-xls', (req, res, next) => {
    res.status(200).send(dataService.getShareholdersXls()); // TODO send the file
});

router.post('/calculate-preview', (req, res, next) => {
    const form = formidable({ multiples: true });
    const parsedData = [];
    form.parse(req, (err, fields, files, next) => {
        var f = files[Object.keys(files)[0]];
        var workbook = XLSX.readFile(f.path);
        const data = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]],
            { header: 1 }
        );
        const parsedHeaders = data[0];
        data.forEach((value, index) => {
            if (index > 0) {
                const tempObject = {};
                parsedHeaders.forEach(
                    (header, index) => (tempObject[header] = value[index])
                );
                parsedData.push(tempObject);
            }
        });

        const preview = {
            existingHeaders: dataService.getHeaders(),
            parsedTable: parsedData,
            parsedHeaders,
        };

        res.status(200).send(preview);
    });
});

// expected body
// {
//     matching: {
//         newHeader1: oldHeader3,
//         newHeader2: oldHeader1,
//         newHeader3: undefined,
//         newHeader4: undefined,
//     },
//     parsedTable: [{ newHeader1: value1, newHeader2: value2,...},...]
// }
//
// data.headers: [oldHeader1, oldHeader2, oldHeader3] => [oldHeader1, oldHeader2, oldHeader3, newHeader3, newHeader4]
router.post('/update-table', (req, res, next) => {
    dataService.updateShareholders();
    res.status(200).send(dataService.getShareholders());
});

module.exports = router;
