var extractValues = require('extract-values');

var extractTestDetails = function(parsedComment) {
  var extractedDetails = {}

  return extractedDetails;
};



//-----------------------EXPECTED OUTPUT--------------------------------
// { testTitle: 'sum function',
//   assertions: [
//     { assertionMessage: 'return the sum of both params',
//       assertionType: 'equal',
//       assertionInput: 'sum(1, 3)',
//       assertionOutput: '4'
//     }
//   ]
// }


module.exports = {
  extractTestDetails: extractTestDetails;
};