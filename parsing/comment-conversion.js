// var extractValues = require('extract-values');
var extractValues = require('../templates/template-utils.js').extractValues;

var assertionTypeMap = {
  '==': 'equal',
  '===': 'deepEqual',
  '!==': 'notEqual',
  '!===': 'notDeepEqual'
};

//Helper takes string as an input, matches to hash map and returns the converted value
var convertAssertionType = function(type) {
  return assertionTypeMap[type];
};

var extractTestDetails = function(parsedAssertions) {
  var assertionParts;

  //Loop over all assertions and use pattern matching to extract the atomic units
  return parsedAssertions.map(function(assertion) {
    assertionParts = extractValues(assertion, '{assertionInput} {assertionType} {assertionOutput} ({assertionMessage})');
    //Convert assertion type from symbol to usable syntax
    try {
      assertionParts.assertionType = convertAssertionType(assertionParts.assertionType);
      if (assertionParts.assertionType === undefined) {
        throw 'assertion error';
      }
    } catch(e) {
      assertionParts = {error: 'Assertion syntax error, please fix assertion syntax.'};
    }
    return assertionParts;
  });
};

module.exports = {
  extractTestDetails: extractTestDetails
};
