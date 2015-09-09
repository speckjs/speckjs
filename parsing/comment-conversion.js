var extractValues = require('extract-values');

var assertionTypeMap = {
  '==': 'equal',
  '===': 'deepEqual',
  '!==': 'notEqual',
  '!===': 'notDeepEqual'
};

var test = [
  'sum(10,10) asdfasdf== 20 (return the sum of both params)'
];

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
      if(assertionParts.assertionType === undefined) {
        throw error();
      }
    } catch(e) {
      console.error('Error: Invalid assertion type. Must be ==, ===, !== or !===.');
    }
    return assertionParts;
  });
};

console.log(extractTestDetails(test));

module.exports = {
  extractTestDetails: extractTestDetails
};
