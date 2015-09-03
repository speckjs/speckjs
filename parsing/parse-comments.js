/*
  ============================================================
  parse-comments.js
  ============================================================
  Receive a string/file/blog as input
  -work with both single line and block comments
  -test without assertion will still parse, not viceversa ofc.
  Speckjs formatted comment example:
  ```
  // test > sum function
  // # sum(1,3) == 4 (returnt.equal(4, file.sum(13) the sum of both params)
  // # sum(10,10) == 20 (return the sum of both params)
  ```
  Return an array of raw test objects in the form of:
  ```
  [
    {
      title: 'sum function',
      loc: { startLine: 0, endLine: 10},`
      assertions: [
        'sum(1,3) == 4 (return the sum of both params)',
        'sum(10,10) == 20 (return the sum of both params)'
      ]
    }
  ]
  ```
*/
var R = require('ramda');
var acorn = require('acorn');
var acornOptions = {locations: true, onComment: onComment};
var tests = [];


// Sanitizing iterator to run on each comment found during parsing
function onComment(isBlock, text, _s, _e, sLoc, eLoc) {

  var tRegex = /test\s*>\s*(.*)/i;
  var aRegex = /#\s*(.*)/i;
  var isTest = R.test(tRegex);
  var extractTest = R.pipe(R.match(tRegex), R.last(), R.trim());
  var isAssertion = R.test(aRegex);
  var extractAssertion = R.pipe(R.match(aRegex), R.last(), R.trim());
  var lastTestFound = R.last(tests);
  var newTest;

  // Functional helpers
  // =================================
  function belongToTest(locLine, test) {
    return (test === undefined) ? false : locLine - 1 === test.loc.endLine;
  }

  function createEmptyTest(title) {
    return {
      title: title || null,
      loc: { startLine: sLoc.line, endLine: eLoc.line },
      assertions: []
    };
  }

  function addAssertionToTest(assertion, test) {
    test.assertions.push(assertion);
    test.loc.endLine = eLoc.line;
    return test;
  }

  function setTestTitle(title, test) {
    test.title = title;
    return test;
  }

  function buildTest(test, string) {
    if (isTest(string)) {
      setTestTitle(extractTest(string), test);
    } else if (isAssertion(string)) {
      addAssertionToTest(extractAssertion(string), test);
    }
    return test;
  }

  // Process Single Line Comment
  // =================================
  if (!isBlock) {
    if (isTest(text)) {
      newTest = R.pipe(extractTest, createEmptyTest)(text);
      tests.push(newTest);
    } else if (isAssertion(text) && belongToTest(sLoc.line, lastTestFound)) {
      addAssertionToTest(extractAssertion(text), lastTestFound);
    }
  }

  // Process Block-Multi line Comment
  // =================================
  if (isBlock && isTest(text)) {
    newTest = R.reduce(buildTest, createEmptyTest(), R.split('\n', text));
    tests.push(newTest);
  }
}


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
};
