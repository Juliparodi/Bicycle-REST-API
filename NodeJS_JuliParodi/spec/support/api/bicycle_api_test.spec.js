var bici = require('../../../models/bicycle');
var axios = require('axios');
var server = require('../../../bin/www');


beforeEach(() => {
    bici.allBicis = [];
})
url1 = 'http://localhost:3000/api/bicicletas/';
urlCreate = 'http://localhost:3000/api/bicicletas/create'

var jsonCreate = { "id": 4, "colour": "red", "model": "ferrari", "latitude": -34.6809673, "longitude": -58.3602928 };


describe('Bici Api', () => {
    describe('GET Bicycles', () => {
        it('Status 200', () => {

            axios.get(url1)
                .then(function (response) {
                    expect(response.status).toBe(200);
                })
            expect(bici.allBicis.length).toBe(0);
        });
    })

    describe('POST Bicycles', () => {
        it('Status 200 with body', () => {
            expect(bici.allBicis.length).toBe(0);

            axios.post(urlCreate,
                jsonCreate)
                .then(function (response) {
                    expect(response.status).toBe(200);
                    expect(bici.findById(4).colour).toBe('red');
                }
                );
        });
    })
});