/*
  ============================================================
  Thatsweet.js: transforming inline comments into unit tests
  ============================================================
  Thatsweet produce sjs syntax file, that can be compiled into
  testSpec.js files via sweet.js ans a set of ad-hoc macros.
*/

var comments = require('./parsing/parse-comments.js');
var extract = require('./parsing/comment-conversion.js');
var tapeTemps = require('./templates/tape/tape-templates.js');
//var jasmineTemps = require('./templates/jasmine/jasmine-templates.js');
var tempUtils = require('./templates/template-utils.js');

var defaultOptions = {
  testFW: 'tape',
  onBuild: null
};

/*
  Public: Gets a file object with SpeckJS-formatted comments.
  Either returns a spec file string, or invokes a callback with the string.

  file  - An object that contains information about the file to parse, including:
    name - A String of the file name.
    content - A String of a JavaScript file.
  options  - An Object of additional parameters (optional).
    testFW - A String of the desired test framework for output ('tape', 'jasmine')
    onBuild - A Function that is called with the returned string representing a spec file.

  Returns: If no onBuild function is provided, returns a string representing a spec file.
*/
var build = function build(file, options) {
  options = options || defaultOptions;
  var output;
  var tests = comments.parse(file.content).tests;

  var testsReadyToAssemble = tests.map(function(test) {
    if (test.assertions.length) {
      var testDetails = extract.extractTestDetails(test.assertions);
      var utilData = tempUtils.prepDataForTemplating(options.testFW, file.name, test, testDetails);
      // Add conditional for jasmine or tape test
      var jsTestString;
      if(options.testFW === 'jasmine'){
        jsTestString = tempUtils.addTestDataToBaseTemplateJasmine(utilData, tapeTemps.base);
      }
      if(options.testFW === 'tape'){
        jsTestString = tempUtils.addTestDataToBaseTemplate(utilData, tapeTemps.base);
      }
      return jsTestString;
    }
  });

  output = tempUtils.assembleTestFile(file.name, testsReadyToAssemble);

  if (typeof options.onBuild === 'function') {
    options.onBuild(output);
  } else {
    return output;
  }
};

module.exports = {
  build: build
};
