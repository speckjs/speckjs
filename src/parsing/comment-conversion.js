var assertionTypeMap = {
  '==': 'equal',
  '===': 'deepEqual',
  '!==': 'notEqual',
  '!===': 'notDeepEqual'
};

//Takes string, matches to hash map, returns the converted value
var convertAssertionType = function(type) {
  return assertionTypeMap[type];
};

var extractTestDetails = function(parsedAssertions) {
  var assertionParts;
  return parsedAssertions.map(function(assertion) {
    assertionParts = _extractValues(assertion, '{assertionInput} {assertionType} {assertionOutput} ({assertionMessage})');
    try {
      assertionParts.assertionType = convertAssertionType(assertionParts.assertionType);
      if (assertionParts.assertionType === undefined) {
        throw 'assertion error';
      }
    } catch (e) {
      assertionParts = {error: 'Assertion syntax error, please fix assertion syntax.'};
    }
    return assertionParts;
  });
};

// Taken from npm package 'extract-values', but their method of
// exporting to 'window' does not work with our Atom package.
// Per their docs: "This is a simple helper to extract values from a string based on a pattern."
var _extractValues = function(str, pattern, options) {
  options = options || {};
  var delimiters = options.delimiters || ['{', '}'];
  var lowercase = options.lowercase;
  var whitespace = options.whitespace;

  var special_chars_regex = /[\\\^\$\*\+\.\?\(\)]/g;
  var token_regex = new RegExp(delimiters[0] + '([^' + delimiters.join('') + '\t\r\n]+)' + delimiters[1], 'g');
  var tokens = pattern.match(token_regex);
  var pattern_regex = new RegExp(pattern.replace(special_chars_regex, '\\$&').replace(token_regex, '(\.+)'));

  if (lowercase) {
    str = str.toLowerCase();
  }

  if (whitespace) {
    str = str.replace(/\s+/g, function(match) {
      var whitespace_str = '';
      for (var i = 0; i < whitespace; i++) {
        whitespace_str = whitespace_str + match.charAt(0);
      }
      return whitespace_str;
    });
  }

  var matches = str.match(pattern_regex);

  if (!matches) {
    return null;
  }

  // Allow exact string matches to return an empty object instead of null
  if (!tokens) {
    return (str === pattern) ? {} : null;
  }

  matches = matches.splice(1);
  var output = {};
  for (var i=0; i < tokens.length; i++) {
    output[tokens[i].replace(new RegExp(delimiters[0] + '|' + delimiters[1], 'g'), '')] = matches[i];
  }

  return output;
};

module.exports = {
  extractTestDetails: extractTestDetails
};
