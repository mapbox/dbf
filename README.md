# dbf

[![Build Status](https://travis-ci.org/mapbox/dbf.svg?branch=master)](https://travis-ci.org/mapbox/dbf)

---

## Looking for extra maintainers!

Mapbox has graciously turned the control of this repo over to [sheindel](https://github.com/sheindel).
However, this should not be maintained by just one individual, so if others are serious about maintaining, 
please open a fresh issue.

---

Write [dBase files](https://en.wikipedia.org/wiki/DBase) in pure JavaScript,
in node.js or browsers. Requires [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer)
and [DataView](https://developer.mozilla.org/en-US/docs/Web/API/DataView)
support.

## usage

```
npm install dbf
```

Or just in a browser:

    https://unpkg.com/dbf@latest/dbf.js

Replace `latest` with the latest version if you want to be sure.

## example

in node:

```js
var dbf = require('../'),
    fs = require('fs');

var buf = dbf.structure([
    {foo:'bar',noo:10},
    {foo:'louie'}
]);

fs.writeFileSync('foo.dbf', toBuffer(buf.buffer));

function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}
```

## API

### `dbf.structure(array)`

Given an array of objects with string or number attributes, return
a DataView object referencing an ArrayBuffer that contains a full DBF
file structure.

## Specifications

* http://www.clicketyclick.dk/databases/xbase/format/dbf.html#DBF_STRUCT
* https://www.oocities.org/geoff_wass/dBASE/GaryWhite/dBASE/FAQ/qformt.htm