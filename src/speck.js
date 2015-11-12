// Dependencies
var comments = require('./parsing/parse-comments.js');
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
  var tests = comments.parse(file.content).tests;
  var testsReadyForAssembly = tempUtils.prepareTestsForAssembly(tests, file, options);
  var output = tempUtils.assembleTestFile(file.name, testsReadyForAssembly, options.testFW);

  if (typeof options.onBuild === 'function') {
    options.onBuild(output);
  } else {
    return output;
  }
};

module.exports = {
  build: build
};
