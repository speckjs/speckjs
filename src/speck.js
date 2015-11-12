// Dependencies
var comments = require('./parsing/parse-comments.js');
var extract = require('./parsing/comment-conversion.js');
var tapeTemps = require('./templates/tape/tape-templates.js');
var jasmineTemps = require('./templates/jasmine/jasmine-templates.js');
var mochaChaiTemps = require('./templates/mocha-chai/mocha-chai-templates.js');
var tempUtils = require('./templates/template-utils.js');
var R = require('ramda');

// Default options for build function
var defaultOptions = {
  testFW: 'tape',
  onBuild: null
};

// Accepts a file object with SpeckJS-formatted comments as input
// Returns a string representation of a spec file, or
// Invokes optional callback on that string if provided in arguments
var build = function build(file, options) {
  options = options ? R.merge(defaultOptions, options) : defaultOptions;
  var output;
  var tests = comments.parse(file.content).tests;

  var testsReadyToAssemble = tests.map(function(test) {
    var testDetails;
    if (test.assertions.length) {
      testDetails = extract.extractTestDetails(test.assertions);
    } else {
      testDetails = '';
    }

    var utilData = tempUtils.prepDataForTemplating(options.testFW, file.name, test, testDetails);
    var jsTestString;

    if (options.testFW === 'jasmine') {
      jsTestString = tempUtils.addTestDataToBaseTemplateJasmine(utilData, jasmineTemps.base);
    }
    if (options.testFW === 'tape') {
      jsTestString = tempUtils.addTestDataToBaseTemplate(utilData, tapeTemps.base, tapeTemps.plan);
    }
    if (options.testFW === 'mocha-chai') {
      jsTestString = tempUtils.addTestDataToBaseTemplateMochaChai(utilData, mochaChaiTemps.base);
    }

    return jsTestString;
  });

  output = tempUtils.assembleTestFile(file.name, testsReadyToAssemble, options.testFW);

  if (typeof options.onBuild === 'function') {
    options.onBuild(output);
  } else {
    return output;
  }
};

module.exports = {
  build: build
};
