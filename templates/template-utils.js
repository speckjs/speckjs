var jasmineTemps = require('./jasmine/jasmine-templates.js');
var tapeTemps = require('./tape/tape-templates.js');
var R = require('ramda');
var eol = require('os').EOL;
var indent = ' ' + ' ';

/*
  Create require statement from given args.
  input:  (String) variable name assigned with required module.
  input:  (String) module name you want to require.
  output: (String) require statement using given arguments.
*/
exports.addRequire = function(varName, module) {
  return tapeTemps.require({
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
exports.addTestDataToBaseTemplate = function(data, baseTemp, planTemp) {

  var renderTests = R.reduce(function(testsString, test) {
    return testsString + renderSingleTest(test, baseTemp, planTemp);
  }, '');

  var renderSingleTest = function(test, baseTemp, planTemp) {
    var base = baseTemp({
      testTitle: test.testTitle
    });
    var plan = planTemp({
      assertions: test.assertions.length
    });
    return eol + base + indent + plan + renderAssertions(test.assertions) + '});' + eol;
  };

  var renderAssertions = R.reduce(function(assertionsString, assertion) {
    return assertionsString + renderSingleAssertion(assertion);
  }, '');

  var renderSingleAssertion = function(assertion) {
    var tempToAdd = tapeTemps[assertion.assertionType];
    if (!tempToAdd){
      return "ERROR: PLEASE CHECK YOUR ASSERTION SYNTAX" + eol;
    }
    return indent + tempToAdd(assertion);
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
    var base = baseTemp({
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
    if (!tempToAdd){
      return "ERROR: PLEASE CHECK YOUR ASSERTION SYNTAX" + eol;
    }
    return tempToAdd(assertion) + eol;
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
  if (framework === 'jasmine') {
    output += jasmineTemps.assert() + eol;
  }
  output += exports.addRequire('test', framework) + exports.addRequire('file', fileName);

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
