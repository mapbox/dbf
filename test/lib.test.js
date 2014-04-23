var test = require('tap').test,
    lib = require('../src/lib');

test('lib', function(t) {
    t.equal(lib.rpad('test', 10, ' '), 'test      ', 'rpad');
    t.equal(lib.lpad('test', 10, ' '), '      test', 'lpad');
    t.end();
});
