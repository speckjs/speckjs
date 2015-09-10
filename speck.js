//`SpeckJS V0.0.3`

// Dependecies and default options for build function.
var comments = require('./parsing/parse-comments.js');
var extract = require('./parsing/comment-conversion.js');
var tapeTemps = require('./templates/tape/tape-templates.js');
var jasmineTemps = require('./templates/jasmine/jasmine-templates.js');
var tempUtils = require('./templates/template-utils.js');
var R = require('ramda');

var defaultOptions = {
  testFW: 'tape',
  onBuild: null
};

//  `build` takes a file object with SpeckJS-formatted comments as input.
//  Returns a string representation of a spec file and optionally invokes a callback on that string if it is provided
//  in the options hash.
var build = function build(file, options) {
  options = options ? R.merge(defaultOptions, options) : defaultOptions;
  var output;
  //  Parses the tests from the input file based on SpeckJS syntax.
  var tests = comments.parse(file.content).tests;
  var testsReadyToAssemble = tests.map(function(test) {
    var testDetails;
    //  If assertions exist, gathers the atomzic units of test assertions.
    //  Otherwise, set to empty string to create blank test.
    if (test.assertions.length) {
      testDetails = extract.extractTestDetails(test.assertions);
    } else {
      testDetails = '';
    }
    var utilData = tempUtils.prepDataForTemplating(options.testFW, file.name, test, testDetails);
    var jsTestString;
    //  Assemble the assertions into a test depending on the testing framework specified.
    if (options.testFW === 'jasmine') {
      jsTestString = tempUtils.addTestDataToBaseTemplateJasmine(utilData, jasmineTemps.base);
    }
    if (options.testFW === 'tape') {
      jsTestString = tempUtils.addTestDataToBaseTemplate(utilData, tapeTemps.base, tapeTemps.plan);
    }
    return jsTestString;
  });

  //  Assembles all the tests into one string.
  //  If a callback was provided it is invoked, otherwise `build` just returns the `output` string.
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
