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
  input:  (Object) test data from parsed comments.
  input:  (String) base-template to build upon with each test and its respective assertions.
  output: (String) interpolated test block.
*/
exports.addTestDataToBaseTemplate = function(data, baseTemp) {
  var renderTests = R.reduce(function(testsString, test) {
    return testsString + renderSingleTest(test, baseTemp);
  }, '');

  var renderSingleTest = function(test, baseTemp) {
    var base = dot.template(baseTemp)({
      testTitle: test.testTitle,
      assertions: test.assertions.length
    }) + '\n';
    return base + renderAssertions(test.assertions);
  };

  var renderAssertions = R.reduce(function(assertionsString, assertion) {
    return assertionsString + renderSingleAssertion(assertion);
  }, '');

  var renderSingleAssertion = function(assertion) {
    var tempToAdd = tapeTemps[assertion.assertionType];
    return dot.template(tempToAdd)(assertion);
  };

  return renderTests(data.tests, baseTemp);
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

