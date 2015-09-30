var extractValues = require('../templates/template-utils.js').extractValues;

var assertionTypeMap = {
  '==': 'equal',
  '===': 'deepEqual',
  '!==': 'notEqual',
  '!===': 'notDeepEqual',
  '>': 'GreaterThan',
  '<': 'LessThan'
};

//Takes string, matches to hash map, returns the converted value
var convertAssertionType = function(type) {
  if (assertionTypeMap[type])
    return assertionTypeMap[type];
  else 
    return type;
};

var extractTestDetails = function(parsedAssertions) {
  var assertionParts;
  return parsedAssertions.map(function(assertion) {
    assertionParts = extractValues(assertion, '{assertionInput} {assertionType} {assertionOutput} ({assertionMessage})');
    try {
      assertionParts.assertionType = convertAssertionType(assertionParts.assertionType);
      if (assertionParts.assertionType === undefined) {
        throw 'assertion error';
      }
    } catch (e) {
      assertionParts = {error: 'Assertion syntax error, please fix assertion syntax. Assertion:'+assertionParts.assertionType};
    }
    return assertionParts;
  });
};

module.exports = {
  extractTestDetails: extractTestDetails
};
