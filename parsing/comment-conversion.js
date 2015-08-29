var extractValues = require('extract-values');

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
    extractedDetails.assertions.push(assertionParts);
  });

  return extractedDetails;
};

module.exports = {
  extractTestDetails: extractTestDetails
};
