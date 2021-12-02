var bici = require('../../../models/bicycle');

beforeEach(() => {
    bici.allBicis = [];
})
var a = new bici(1, 'red', 'motobike', [34.6712227, -58.3554249]);

describe('bici.allBicis', () => {
    it('Start empty', () => {
        expect(bici.allBicis.length).toBe(0);
    });
});

describe('bici.add', () => {
    it('added 1', () => {
        expect(bici.allBicis.length).toBe(0);

        bici.add(a);

        expect(bici.allBicis.length).toBe(1);
        expect(bici.allBicis[0]).toEqual(a);
    });
});

describe('bici.findById', () => {
    it('find bici with id 1', () => {

        var id = 1;
        bici.add(a);
        var bici2 = bici.findById(id);

        expect(bici.findById(1)).toEqual(a);

    });
});