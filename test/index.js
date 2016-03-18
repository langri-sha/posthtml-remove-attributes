var assert = require('power-assert');
var posthtml = require('posthtml');
var removeAttributes = require('..');

function test(title, attributes, input, reference) {
  it(title, function (done) {
    posthtml()
      .use(removeAttributes(attributes))
      .process(input)
      .then(function (result) {
        assert.equal(result.html, reference);
        done();
      })
      .catch(done);
  })
}

describe('Remove attributes', function () {
  describe('Remove attributes in string form', function () {
    test(
      'should remove attributes',
      ['class'],
      '<html><body><p class="wow">OMG</p></body></html>',
      '<html><body><p>OMG</p></body></html>'
    );

    test(
      'should not remove other attributes',
      ['class'],
      '<html><body><p class="wow" style="display: block;">OMG</p></body></html>',
      '<html><body><p style="display: block;">OMG</p></body></html>'
    );

    test(
      'should remove attributes with non-array argument',
      'class',
      '<html><body><p class="wow">OMG</p></body></html>',
      '<html><body><p>OMG</p></body></html>'
    );

    test(
      'should remove different attributes',
      ['class', 'style'],
      '<html><body><p class="wow" style="display: inline;">OMG</p></body></html>',
      '<html><body><p>OMG</p></body></html>'
    );

    test(
      'should remove attributes in different places',
      ['class', 'style'],
      '<html class="wow"><body class="wow"><p style="display: inline;">OMG</p></body></html>',
      '<html><body><p>OMG</p></body></html>'
    );


    test(
      'should remove empty attributes',
      ['class', 'style'],
      '<html><body style><p class>OMG</p></body></html>',
      '<html><body><p>OMG</p></body></html>'
    );
  });

  describe('Remove attributes in object form', function () {
    test(
      'should remove attributes with non-array argument',
      {name: 'class', value: 'wow'},
      '<html><body><p class="wow">OMG</p></body></html>',
      '<html><body><p>OMG</p></body></html>'
    );


    test(
      'should remove attributes matching by string',
      [{name: 'class', value: 'wow'}],
      '<html><body><p class="wow">OMG</p></body></html>',
      '<html><body><p>OMG</p></body></html>'
    );

    test(
      'should remove attributes matching by string regexp',
      [{name: 'class', value: /wow/}],
      '<html><body><p class="wow">OMG</p></body></html>',
      '<html><body><p>OMG</p></body></html>'
    );

    test(
      'should not remove non-matching by string attributes',
      [{name: 'class', value: 'wow'}],
      '<html><body class="wow"><p class="lol">OMG</p></body></html>',
      '<html><body><p class="lol">OMG</p></body></html>'
    );

    test(
      'should not remove non-matching by regexp attributes',
      [{name: 'class', value: /wow/}],
      '<html><body class="wow"><p class="lol">OMG</p></body></html>',
      '<html><body><p class="lol">OMG</p></body></html>'
    );

    test(
      'should not remove non-matching by regexp attributes with multiple patterns',
      [{name: 'class', value: /wow/}, {name: 'class', value: /lol/}],
      '<html class="no"><body class="wow"><p class="lol">OMG</p></body></html>',
      '<html class="no"><body><p>OMG</p></body></html>'
    );
  });
});
