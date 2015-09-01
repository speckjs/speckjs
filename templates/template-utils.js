var dot = require('dot');
var tapeTemps = require('./tape-templates.js');

/*
  Function that transforms an object into JavaScript test code.
  input:  (String) base-template to build upon with each test and its respective assertions.
  input:  (Object) test data from parsed comments.
  output: (String) interpolated test block.
*/
exports.addTestDataToBaseTemplate = function(baseTemp, data) {
  var tests = data.tests;
  var result = '';

  // For each test
  for (var i=0; i < tests.length; i++) {
    // Add title and assertion count to baseTemp
    var currentTest = dot.template(baseTemp)({testTitle: tests[i].testTitle,
                                              assertions: tests[i].assertions.length}) + '\n';

    // For each assertion in test
    for (var j=0; j < tests[i].assertions.length; j++) {
      var tempToAdd = tapeTemps[tests[i].assertions[j].assertionType];
      var compiledAssertToAdd = dot.template(tempToAdd)(tests[i].assertions[j]);

      // Add filled-in template to currentTest
      currentTest += compiledAssertToAdd + '\n';
    }

    // Close currentTest block and add to result
    result += currentTest + '}); \n';
  }

  // Return string representing interpolated test block
  return result;
};
