var dot = require('dot');
var tapeTemps = require('./tape/tape-templates.js');
var R = require('ramda');

/*
  Create require statement from given args.
  input:  (String) variable name assigned with required module.
  input:  (String) module name you want to require.
  output: (String) require statement using given arguments.
*/
exports.addRequire = function(varName, module) {
  return dot.template(tapeTemps.require)({
    varName: varName,
    module: module
  });
};


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


/*
  Creates an object in the format that the templating helper function expects.
  input:  (String) path to where you want new test file saved.
  input:  (String) name used to create test file.
  input:  (String) String ready to be written to file.
  output: (Object) properly formatted test object ready for templating
*/
exports.prepDataForTemplating = function(testFW, fileName, currentTest, testDetails) {
  return {
    specType : testFW,
    specFileSrc : fileName,
    tests : [
      { testTitle: currentTest.title,
        assertions: testDetails
      }
    ]
  };
};


/*
  Assembles String for new test file.
  input:  (String) name of file being parsed.
  input:  (Array) strings ready to be added to test file.
  output: (String) completely filled-out test template.
*/
exports.assembleTestFile = function(fileName, tests) {
  // Write require statements for testing library and parsed file
  var output = '';
  output += exports.addRequire('test', 'tape') + exports.addRequire('file', '../' + fileName);

  return R.reduce(function(testFile, test) {
    return testFile + test;
  }, output, tests);
};

