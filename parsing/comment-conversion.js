var extractValues = require('extract-values');

var assertionTypeMap = {
  '==': 'equal',
  '===': 'deepEqual'
};

//Helper takes string as an input, matches to hash map and returns the converted value
var convertAssertionType = function(type) {
  return assertionTypeMap[type];
};

var extractTestDetails = function(parsedComment) {
  var extractedDetails = {};

  //Matches pattern of the test line to get just the title of the test
  var testLineParts = extractValues(parsedComment.testLine, '{type} > {testTitle}');
  extractedDetails.testTitle = testLineParts.testTitle;

  extractedDetails.assertions = [];
  var assertionParts;

  //Loop over all assertions and use pattern matching to extract the atomic units
  parsedComment.assertions.forEach(function(assertion) {
    assertionParts = extractValues(assertion, '{assertionInput} {assertionType} {assertionOutput} ({assertionMessage})');

    //Convert assertion type from symbol to usable syntax
    assertionParts.assertionType = convertAssertionType(assertionParts.assertionType);
    extractedDetails.assertions.push(assertionParts);
  });

  return extractedDetails;
};

module.exports = {
  extractTestDetails: extractTestDetails
};
