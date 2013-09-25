var expect = require('expect.js'),
    header = require('../src/header');

describe('header', function() {
    it('generates a one-field header', function() {
        var obj = header([{
            name: 'foo',
            type: 'D'
        }], 10);
        expect(obj).to.be.ok();
        expect(obj.header).to.be.ok();
        expect(obj.recordLength).to.eql(9);
        expect(obj.field).to.be.ok();
    });

    it('generates a two-field header', function() {
        var obj = header([
            {
                name: 'foo',
                type: 'L'
            },
            {
                name: 'bar',
                type: 'D'
            }
        ], 10);
        expect(obj).to.be.ok();
        expect(obj.header).to.be.ok();
        expect(obj.recordLength).to.eql(10);
        expect(obj.field).to.be.ok();
    });
});
