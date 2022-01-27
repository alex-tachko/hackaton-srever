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
        headers: [
            'First Name',
            'Last Name',
            'Company',
            'Date of Birth',
            'E-mail Address',
            'Phone',
        ], // keys of shareholder object values
        shareholders: [
            // {
            //     id: 1,
            //     User: 'Mikky',
            //     LastName: 'Jameson',
            //     Email: 'mikky@wevestr.com',
            // },
            // {
            //     id: 2,
            //     User: 'Mikky',
            //     LastName: 'Jameson',
            //     Email: 'mikky@wevestr.com',
            // },
            // {
            //     id: 3,
            //     User: 'Mikky',
            //     LastName: 'Jameson',
            //     Email: 'mikky@wevestr.com',
            // },

            {
                'First Name': 'Stella',
                'Last Name': 'Allen',
                Company: 'Tesla',
                'Date of Birth': 33889,
                'E-mail Address': 's.allen@randatmail.com',
                Phone: '054-3863-07',
            },
            {
                'First Name': 'Emma',
                'Last Name': 'Owens',
                Company: 'Apple',
                'Date of Birth': 32547,
                'E-mail Address': 'e.owens@randatmail.com',
                Phone: '916-1397-80',
            },
            {
                'First Name': 'Adison',
                'Last Name': 'Henderson',
                Company: 'Google',
                'Date of Birth': 27882,
                'E-mail Address': 'a.henderson@randatmail.com',
                Phone: '401-5057-38',
            },
            {
                'First Name': 'Adrianna',
                'Last Name': 'Hawkins',
                Company: 'Meta',
                'Date of Birth': 32240,
                'E-mail Address': 'a.hawkins@randatmail.com',
                Phone: '928-7968-53',
            },
            {
                'First Name': 'Emma',
                'Last Name': 'Roberts',
                Company: 'Amazon',
                'Date of Birth': 31739,
                'E-mail Address': 'e.roberts@randatmail.com',
                Phone: '071-0046-92',
            },
            {
                'First Name': 'Penelope',
                'Last Name': 'Carter',
                Company: 'Twitter',
                'Date of Birth': 31740,
                'E-mail Address': 'p.carter@randatmail.com',
                Phone: '604-2991-49',
            },
            {
                'First Name': 'Lily',
                'Last Name': 'Davis',
                Company: 'Rivian',
                'Date of Birth': 24436,
                'E-mail Address': 'l.davis@randatmail.com',
                Phone: '294-1261-85',
            },
            {
                'First Name': 'Arthur',
                'Last Name': 'Thomas',
                Company: 'Apple',
                'Date of Birth': 29551,
                'E-mail Address': 'a.thomas@randatmail.com',
                Phone: '188-3512-97',
            },
            {
                'First Name': 'Jack',
                'Last Name': 'Hamilton',
                Company: 'Google',
                'Date of Birth': 29186,
                'E-mail Address': 'j.hamilton@randatmail.com',
                Phone: '737-0453-21',
            },
            {
                'First Name': 'Freddie',
                'Last Name': 'Cole',
                Company: 'Meta',
                'Date of Birth': 35397,
                'E-mail Address': 'f.cole@randatmail.com',
                Phone: '185-0125-84',
            },
            {
                'First Name': 'Thomas',
                'Last Name': 'Fowler',
                Company: 'Amazon',
                'Date of Birth': 28458,
                'E-mail Address': 't.fowler@randatmail.com',
                Phone: '518-2342-68',
            },
            {
                'First Name': 'Sawyer',
                'Last Name': 'Miller',
                Company: 'Twitter',
                'Date of Birth': 30285,
                'E-mail Address': 's.miller@randatmail.com',
                Phone: '031-2288-61',
            },
            {
                'First Name': 'Jack',
                'Last Name': 'Gibson',
                Company: 'Rivian',
                'Date of Birth': 30651,
                'E-mail Address': 'j.gibson@randatmail.com',
                Phone: '233-5376-12',
            },
            {
                'First Name': 'Lucas',
                'Last Name': 'Bennett',
                Company: 'Tesla',
                'Date of Birth': 32844,
                'E-mail Address': 'l.bennett@randatmail.com',
                Phone: '836-6206-71',
            },
            {
                'First Name': 'Michael',
                'Last Name': 'Chapman',
                Company: 'Apple',
                'Date of Birth': 33941,
                'E-mail Address': 'm.chapman@randatmail.com',
                Phone: '746-5708-48',
            },
            {
                'First Name': 'Sarah',
                'Last Name': 'Andrews',
                Company: 'Google',
                'Date of Birth': 34672,
                'E-mail Address': 's.andrews@randatmail.com',
                Phone: '922-4592-17',
            },
            {
                'First Name': 'Jasmine',
                'Last Name': 'Bennett',
                Company: 'Meta',
                'Date of Birth': 34308,
                'E-mail Address': 'j.bennett@randatmail.com',
                Phone: '504-3907-31',
            },
            {
                'First Name': 'Paige',
                'Last Name': 'Morgan',
                Company: 'Amazon',
                'Date of Birth': 30656,
                'E-mail Address': 'p.morgan@randatmail.com',
                Phone: '403-1623-27',
            },
            {
                'First Name': 'Blake',
                'Last Name': 'Evans',
                Company: 'Twitter',
                'Date of Birth': 31388,
                'E-mail Address': 'b.evans@randatmail.com',
                Phone: '396-9660-36',
            },
            {
                'First Name': 'Alina',
                'Last Name': 'Taylor',
                Company: 'Rivian',
                'Date of Birth': 20797,
                'E-mail Address': 'a.taylor@randatmail.com',
                Phone: '194-9815-52',
            },
        ],
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

    updateShareholders(mapping, parsedTable) {
        Object.values(mapping).forEach(([newValue, oldValue]) => {
            parsedTable;
        });
        // return {
        //     headersMatch: parsedHeaders?.filter((header) =>
        //         this.data?.headers(header)
        //     ),
        // };
    }

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
    const { mapping, parsedTable } = req.body;
    dataService.updateShareholders(mapping, parsedTable);
    res.status(200).send(dataService.getShareholders());
});

module.exports = router;
