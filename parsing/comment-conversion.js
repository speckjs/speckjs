var extractValues = require('extract-values');

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
    assertionParts.assertionType = convertAssertionType(assertionParts.assertionType);
    return assertionParts;
  });
};

// console.log(extractTestDetails(test));

module.exports = {
  extractTestDetails: extractTestDetails
};
