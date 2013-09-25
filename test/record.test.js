var expect = require('expect.js'),
    record = require('../src/record');

describe('record', function() {
    it('creates a blank record', function() {
        var dat = record([{
            type: 'L',
            name: 'foo'
        }], [], 2);
        expect(dat).to.be.ok();
    });
});
