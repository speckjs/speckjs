var jasmineTemps = require('./jasmine/jasmine-templates.js');
var tapeTemps = require('./tape/tape-templates.js');
var mochaChaiTemps = require('./mocha-chai/mocha-chai-templates.js');
var R = require('ramda');
var eol = require('os').EOL;
var indent = ' ' + ' ';

//Create require statement for test files
exports.addRequire = function(varName, module) {
  return tapeTemps.require({
    varName: varName,
    module: module
  });
};


//Transforms object into JS tape test code.  Input is test data and templates
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
    if (!tempToAdd) {
      return indent + 'ERROR: PLEASE CHECK YOUR ASSERTION SYNTAX' + eol;
    }
    return indent + tempToAdd(assertion);
  };

  return renderTests(data.tests, baseTemp);
};

//Transforms object into JS jasmine test code.  Input -> test data, template
exports.addTestDataToBaseTemplateJasmine = function(data, baseTemp) {
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
    if (!tempToAdd) {
      return indent + 'ERROR: PLEASE CHECK YOUR ASSERTION SYNTAX' + eol;
    }
    return tempToAdd(assertion) + eol;
  };

  return renderTests(data.tests, baseTemp);
};

//Transforms object into JS mocha chai test code.  Input -> test data, template
exports.addTestDataToBaseTemplateMochaChai = function(data, baseTemp) {
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
    var tempToAdd = mochaChaiTemps[assertion.assertionType];
    if (!tempToAdd) {
      return indent + 'ERROR: PLEASE CHECK YOUR ASSERTION SYNTAX' + eol;
    }
    return tempToAdd(assertion) + eol;
  };

  return renderTests(data.tests, baseTemp);
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
