var test = require('tap').test,
    structure = require('../src/structure');

test('structure', function(t) {
    var dat = structure([{ foo: 'bar' }]);
    t.ok(dat);
    t.end();
});
