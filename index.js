var objectAssign = require('object-assign');
var ANY_STRING_PATTERN = /.*/;

module.exports = function (attributes) {
  if (!Array.isArray(attributes)) {
    attributes = [attributes];
  }

  var matchers = attributes.map(function (attribute) {
    var matcher = {};
    if (typeof attribute === 'string') {
      matcher[attribute] = ANY_STRING_PATTERN;
    } else {
      matcher[attribute.name] = attribute.value;
    }
    return {attrs: matcher};
  });

  var attributesMatchers = attributes.map(function (attribute) {
    if (typeof attribute === 'string') {
      return {
        name: attribute,
        value: ANY_STRING_PATTERN
      };
    } else {
      return attribute;
    }
  });

  return function (tree) {
    tree.match(matchers, function (node) {
      var attrs = {};

      Object.keys(node.attrs).forEach(function (attribute) {
        var attributeValue = node.attrs[attribute];

        var shouldBeRemoved = attributesMatchers.some(function (attributeMatcher) {
          return attributeMatcher.name === attribute &&
            (typeof attributeMatcher.value === 'string' && attributeMatcher.value === attributeValue ||
            attributeMatcher.value instanceof RegExp && attributeMatcher.value.test(attributeValue));
        });

        if (!shouldBeRemoved) {
          attrs[attribute] = attributeValue;
        }
      });


      return objectAssign(node, {attrs: attrs});
    });
  };
};
