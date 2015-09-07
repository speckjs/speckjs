var dot = require('dot');
var jasmineTemps = require('./jasmine/jasmine-templates.js');
var tapeTemps = require('./tape/tape-templates.js');
var R = require('ramda');
var eol = require('os').EOL;

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
  }) + eol;
};


/*
  Function that transforms an object into JavaScript test code.
  input:  (Object) test data from parsed comments.
  input:  (String) base-template to build upon with each test and its respective assertions.
  output: (String) interpolated test block.
*/
exports.addTestDataToBaseTemplate = function(data, baseTemp) {

  var renderTests = R.reduce(function(testsString, test) {
    return testsString + renderSingleTest(test, baseTemp) + eol;
  }, '' + eol);

  var renderSingleTest = function(test, baseTemp) {
    var base = dot.template(baseTemp)({
      testTitle: test.testTitle,
      assertions: test.assertions.length
    });
    return base + eol + renderAssertions(test.assertions) + '});';
  };

  var renderAssertions = R.reduce(function(assertionsString, assertion) {
    return assertionsString + renderSingleAssertion(assertion);
  }, '');

  var renderSingleAssertion = function(assertion) {
    var tempToAdd = tapeTemps[assertion.assertionType];
    return ' ' + ' ' + dot.template(tempToAdd)(assertion) + eol;
  };

  return renderTests(data.tests, baseTemp);
};

/*
  Function that transforms an object into JavaScript test code.
  input:  (String) base-template to build upon with each test and its respective assertions.
  input:  (Object) test data from parsed comments.
  output: (String) interpolated test block.
*/
//A separate utility function for Jasmine, largely the same, but modularized incase there's
//alot of specific jasmine logic we need to add
exports.addTestDataToBaseTemplateJasmine = function(data, baseTemp) {
//Write function similar to tape base template function
  var renderTests = R.reduce(function(testsString, test) {
    return testsString + renderSingleTest(test, baseTemp) + eol;
  }, '' + eol);

  var renderSingleTest = function(test, baseTemp) {
    var base = dot.template(baseTemp)({
      testTitle: test.testTitle,
      assertions: test.assertions.length
    });
    return base + eol + renderAssertions(test.assertions) + '});';
  };

  var renderAssertions = R.reduce(function(assertionsString, assertion) {
    return assertionsString + renderSingleAssertion(assertion);
  }, '');

  var renderSingleAssertion = function(assertion) {
    var tempToAdd = jasmineTemps[assertion.assertionType];
    return ' ' + ' ' + dot.template(tempToAdd)(assertion) + eol;
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

//Add a paramter for framework instead of hard coding tape
//Add logic for requiring assert library for equals/deep equals
exports.assembleTestFile = function(fileName, tests, framework) {
  // Write require statements for testing library and parsed file
  var output = '';
  if (framework === 'jasmine'){
    output += jasmineTemps.assert + eol;
  }
  output += exports.addRequire('test', framework) + exports.addRequire('file', '../' + fileName);

  return R.reduce(function(testFile, test) {
    return testFile + test;
  }, output, tests);
};
