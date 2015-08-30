/*
  ============================================================
  parse-comments.js
  ============================================================
  Receive a string/file/blog as input:
  check for speckjs formatted comments:
  ```
  // test > sum function
  // # sum(1,3) == 4 (returnt.equal(4, file.sum(13) the sum of both params)
  // # sum(10,10) == 20 (return the sum of both params)
  ```
  and return an array of raw test objects in the form of:
  ```
  [
    {
      testLine: 'test > sum function'
      assertions: [
        'sum(1,3) == 4 (return the sum of both params)',
        'sum(10,10) == 20 (return the sum of both params)'
      ]
    }
  ]
  ```
*/
var acorn = require('acorn');
var extractValues = require("extract-values");
var tests = [];

// Sanitizing iterator to run on each comment found during parsing
var onComment = function(block, text, start, end, startLoc, endLoc) {
  // Check if a block is a test pattern: {start > ...}
  var spec = extractValues(text, '{flag} > {title}');
  var assertion = extractValues(text, '#{body}');
  var test = {};

  if (spec !== null && spec.flag.trim() === 'test') {
    test.testTitle = spec.title.trim();
    test.testLoc = endLoc.line;
    test.assertions = [];
    tests.push(test);
  } else if (assertion !== null && startLoc.line === tests[tests.length - 1].testLoc +1 ) {
    tests[tests.length - 1].testLoc = endLoc.line;
    tests[tests.length - 1].assertions.push(assertion.body.trim());
  }
};

// Setting acorn for our parsing needs
var acornOptions =  {
  locations: true,
  onComment: onComment
};

// Parsing via acorn and returning an enriched object
// containing the whole ast and tests array as properties.
var parse = function(string, options) {
  options = options || acornOptions;
  var output = {};
  output.ast = acorn.parse(string, options);
  output.tests = tests;

  return output;
};


// Public parsing API
module.exports = {
  parse: parse
  // getters for ast, filename, whataver
};
