var jasmineTemps = require('./jasmine/jasmine-templates.js');
var tapeTemps = require('./tape/tape-templates.js');
var mochaChaiTemps = require('./mocha-chai/mocha-chai-templates.js');
var extract = require('../parsing/comment-conversion.js');
var R = require('ramda');
var eol = require('os').EOL;
var indent = ' ' + ' ';

// Takes data and creates a properly formatted object to use in template functions
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

// Takes a collection of parsed SpeckJS comments and returns a collection of individual tests
exports.prepareTestsForAssembly = function(tests, file, options) {
  return tests.map(function(test) {
    var testDetails;
    if (test.assertions.length) {
      testDetails = extract.extractTestDetails(test.assertions);
    } else {
      testDetails = '';
    }

    var utilData = exports.prepDataForTemplating(options.testFW, file.name, test, testDetails);
    return _addTestDataToTemplate(utilData, options.testFW);
  });
};

// Assembles individual pieces of the test file together and returns a string
exports.assembleTestFile = function(fileName, tests, framework) {
  var output = '';

  if (framework === 'jasmine') {
    output += jasmineTemps.assert() + eol;
  }
  if(framework === 'mocha-chai'){
    output += exports.addRequire('chai', 'chai');
    output += mochaChaiTemps.shouldExecute();
  }
  if(framework === 'tape') {
    output += exports.addRequire('test', framework);
  }

  output += exports.addRequire('file', fileName);

  return R.reduce(function(testFile, test) {
    return testFile + test;
  }, output, tests);
};

// Create require statement for test files
// * tapeTemps require statement also valid for Jasmine/Mocha-Chai *
exports.addRequire = function(varName, module) {
  return tapeTemps.require({
    varName: varName,
    module: module
  });
};


///////////////////
// PRIVATE HELPERS
///////////////////
var _currentSpecType;

// Set value for the current type of spec being built
var _setCurrentSpecType = function(fw) {
  _currentSpecType = fw;
}

// Get value for the current type of spec being built
var _getCurrentSpecType = function() {
  return _currentSpecType
}

// Transforms data into usable specs for desired framework
var _addTestDataToTemplate = function(data, fw) {
  _setCurrentSpecType(fw);
  return _renderTests(data.tests);
};

////////////////
// render tests
////////////////
var _renderTests = R.reduce(function(testsString, test) {
  var currentType = _getCurrentSpecType();
  if (currentType === 'tape') {
    return testsString + _renderSingleTapeTest(test);
  }
  var baseTemp = currentType === 'jasmine' ? jasmineTemps.base : mochaChaiTemps.base;
  return testsString + _renderSingleTest(test, baseTemp) + eol;
}, '' + eol);

var _renderSingleTest = function(test, baseTemp) {
  var base = baseTemp({
    testTitle: test.testTitle,
    assertions: test.assertions.length
  });
  return base + eol + _renderAssertions(test.assertions) + '});';
};

/////////////////////
// render assertions
/////////////////////
var _renderAssertions = R.reduce(function(assertionsString, assertion) {
  return assertionsString + _renderSingleAssertion(assertion);
}, '');

var _renderSingleAssertion = function(assertion) {
  var tempToAdd;
  var currentType = _getCurrentSpecType();

  if (currentType === 'tape') {
    tempToAdd = tapeTemps[assertion.assertionType];
  } else if (currentType === 'jasmine') {
    tempToAdd = jasmineTemps[assertion.assertionType];
  } else if (currentType === 'mocha-chai') {
    tempToAdd = mochaChaiTemps[assertion.assertionType];
  }

  if (!tempToAdd) {
    return indent + 'ERROR: PLEASE CHECK YOUR ASSERTION SYNTAX' + eol;
  }

  return indent + tempToAdd(assertion);
};

////////////
// for Tape
////////////
// Tape's use of 'plan' requires slightly different template building
var _renderSingleTapeTest = function(test) {
  var base = tapeTemps.base({
    testTitle: test.testTitle
  });
  var plan = tapeTemps.plan({
    assertions: test.assertions.length
  });
  return base + indent + plan + _renderAssertions(test.assertions) + '});' + eol;
};
