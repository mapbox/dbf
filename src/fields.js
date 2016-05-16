var fieldSize = require('./fieldsize');

var types = {
    string: 'C',
    number: 'N',
    boolean: 'L',
    // type to use if all values of a field are null
    null: 'C'
};

module.exports.multi = multi;
module.exports.bytesPer = bytesPer;
module.exports.obj = obj;

function multi(features) {
    var fields = {};
    features.forEach(collect);
    function collect(f) { inherit(fields, f); }
    return obj(fields);
}

/**
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
function inherit(a, b) {
    for (var i in b) {
        var isDef = typeof b[i] !== 'undefined' && b[i] !== null;
        if (typeof a[i] === 'undefined' || isDef) {
          a[i] = b[i];
        }
    }
    return a;
}

function obj(_) {
    var fields = {}, o = [];
    for (var p in _) fields[p] = _[p] === null ? 'null' : typeof _[p];
    for (var n in fields) {
        var t = types[fields[n]];
        if(t){
             o.push({
                name: n,
                type: t,
                size: fieldSize[t]
            });
        }
    }
    return o;
}

/**
 * @param {Array} fields
 * @returns {Array}
 */
function bytesPer(fields) {
    // deleted flag
    return fields.reduce(function(memo, f) { return memo + f.size; }, 1);
}
