[posthtml](https://github.com/posthtml/posthtml)-remove-attributes
==================

PostHTML plugin to remove attributes unconditionally or with content match

[![Dependency Status](https://img.shields.io/david/princed/posthtml-remove-attributes.svg?style=flat-square)](https://david-dm.org/princed/posthtml-remove-attributes) [![Greenkeeper badge](https://badges.greenkeeper.io/princed/posthtml-remove-attributes.svg)](https://greenkeeper.io/)
 [![Current version](https://img.shields.io/npm/v/posthtml-remove-attributes.svg?style=flat-square)](https://www.npmjs.com/package/posthtml-remove-attributes) [![Travis Build Status](https://img.shields.io/travis/princed/posthtml-remove-attributes.svg?style=flat-square)](https://travis-ci.org/princed/posthtml-remove-attributes)

Installation
------------

Install the `posthtml-remove-attributes`:

```sh
$ npm install posthtml-remove-attributes --save
```

Usage
-----

```javascript
var posthtml = require('posthtml');
var removeAttributes = require('posthtml-remove-attributes');

var html = '<div style="display: inline;" class="wow">OMG</div>';

posthtml([ 
  removeAttributes([  // The only non-array argument is also possible
    'class', // match name
    {name: 'style', value: /inline/} // match name and value
  ])
])
    .process(html)
    .then(function(result) {
        console.log(result);
    });

// Yields:
// <div>OMG</div>
```

Contribution guidelines
--------------------------

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using `npm test`.
