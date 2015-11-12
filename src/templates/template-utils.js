var jasmineTemps = require('./jasmine/jasmine-templates.js');
var tapeTemps = require('./tape/tape-templates.js');
var mochaChaiTemps = require('./mocha-chai/mocha-chai-templates.js');
var R = require('ramda');
var eol = require('os').EOL;
var indent = ' ' + ' ';

// Create require statement for test files
// * tapeTemps require statement also valid for Jasmine/Mocha-Chai *
exports.addRequire = function(varName, module) {
  return tapeTemps.require({
    varName: varName,
    module: module
  });
};


// Transforms data into Tape specs. Input -> test data, templates
exports.addTestDataToBaseTemplateTape = function(data, baseTemp, planTemp) {
  var renderTapeTests = R.reduce(function(testsString, test) {
    return testsString + _renderSingleTapeTest(test, baseTemp, planTemp);
  }, '');

  return _renderTapeTests(data.tests, baseTemp);
};


// Transforms data into Jasmine specs. Input -> test data, template
exports.addTestDataToBaseTemplateJasmine = function(data, baseTemp) {
  _renderTests.fw = "jasmine";
  return _renderTests(data.tests, baseTemp);
};


// Transforms data into Mocha/Chai specs. Input -> test data, template
exports.addTestDataToBaseTemplateMochaChai = function(data, baseTemp) {
  _renderTests.fw = "mocha-chai";
  return _renderTests(data.tests, baseTemp);
};


//Takes data and creates a properly formatted object to use in template functions
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


//Assembles individual pieces of the test file together and returns a string
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


// Taken from npm package 'extract-values', but their method of
// exporting to 'window' does not work with our Atom package.
// Per their docs: "This is a simple helper to extract values from a string based on a pattern."
exports.extractValues = function(str, pattern, options) {
  options = options || {};
  var delimiters = options.delimiters || ['{', '}'];
  var lowercase = options.lowercase;
  var whitespace = options.whitespace;

  var special_chars_regex = /[\\\^\$\*\+\.\?\(\)]/g;
  var token_regex = new RegExp(delimiters[0] + '([^' + delimiters.join('') + '\t\r\n]+)' + delimiters[1], 'g');
  var tokens = pattern.match(token_regex);
  var pattern_regex = new RegExp(pattern.replace(special_chars_regex, '\\$&').replace(token_regex, '(\.+)'));

  if (lowercase) {
    str = str.toLowerCase();
  }

  if (whitespace) {
    str = str.replace(/\s+/g, function(match) {
      var whitespace_str = '';
      for (var i = 0; i < whitespace; i++) {
        whitespace_str = whitespace_str + match.charAt(0);
      }
      return whitespace_str;
    });
  }

  var matches = str.match(pattern_regex);

  if (!matches) {
    return null;
  }

  // Allow exact string matches to return an empty object instead of null
  if (!tokens) {
    return (str === pattern) ? {} : null;
  }

  matches = matches.splice(1);
  var output = {};
  for (var i=0; i < tokens.length; i++) {
    output[tokens[i].replace(new RegExp(delimiters[0] + '|' + delimiters[1], 'g'), '')] = matches[i];
  }

  return output;
};


///////////////////
// PRIVATE HELPERS
///////////////////
var _renderAssertions = R.reduce(function(assertionsString, assertion) {
  return assertionsString + _renderSingleAssertion(assertion);
}, '');

var _renderSingleAssertion = function(assertion) {
  var tempToAdd = tapeTemps[assertion.assertionType];
  if (!tempToAdd) {
    return indent + 'ERROR: PLEASE CHECK YOUR ASSERTION SYNTAX' + eol;
  }
  return indent + tempToAdd(assertion);
};

////////////
// for Tape
////////////
// Tape's use of 'plan' requires slightly different template building
var _renderTapeTests = R.reduce(function(testsString, test) {
  return testsString + _renderSingleTapeTest(test, tapeTemps.base, tapeTemps.plan);
}, '');

var _renderSingleTapeTest = function(test, baseTemp, planTemp) {
  var base = baseTemp({
    testTitle: test.testTitle
  });
  var plan = planTemp({
    assertions: test.assertions.length
  });
  return eol + base + indent + plan + _renderAssertions(test.assertions) + '});' + eol;
};

/////////////////////////////
// for Jasmine and Mocha-Chai
/////////////////////////////
var _renderTests = R.reduce(function(testsString, test) {
  var baseTemp = _renderTests.fw === 'jasmine' ? jasmineTemps.base : mochaChaiTemps.base;
  return testsString + _renderSingleTest(test, baseTemp) + eol;
}, '' + eol);

var _renderSingleTest = function(test, baseTemp) {
  var base = baseTemp({
    testTitle: test.testTitle,
    assertions: test.assertions.length
  });
  return base + eol + _renderAssertions(test.assertions) + '});';
};
