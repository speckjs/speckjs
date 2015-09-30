/*
  parse-comments.js
  ============================================================
  Takes data and outputs raw test objects
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
var acorn = require('acorn/dist/acorn_csp.js');
var acornOptions = {locations: true, onComment: onComment};
var tests = [];

var tRegex;
var aRegex;

// Sanitizing iterator to run on each comment found during parsing
function onComment(isBlock, text, _s, _e, sLoc, eLoc) {

  
  
  var isTest = R.test(tRegex);
  var extractTest = R.pipe(R.match(tRegex), R.last(), R.trim());
  var isAssertion = R.test(aRegex);
  var extractAssertion = R.pipe(R.match(aRegex), R.last(), R.trim());
  var lastTestFound = R.last(tests);
  var newTest;

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

  if (!isBlock) {
    if (isTest(text)) {
      newTest = R.pipe(extractTest, createEmptyTest)(text);
      tests.push(newTest);
    } else if (isAssertion(text) && belongToTest(sLoc.line, lastTestFound)) {
      addAssertionToTest(extractAssertion(text), lastTestFound);
    }
  }

  if (isBlock && isTest(text)) {
    newTest = R.reduce(buildTest, createEmptyTest(), R.split('\n', text));
    tests.push(newTest);
  }
}

var parse = function(string, options) {
  tests = [];
  options = options || acornOptions;
  var output = {};
  output.ast = acorn.parse(string, options);
  output.tests = tests;
  return output;
};

// 
// # setRegex - Allows us to overwrite the default regex to pick tests from comments
// 
var setRegex = function(titleRegex, assertionRegex) {
    tRegex = titleRegex;
    aRegex =  assertionRegex;
}


// Public parsing API
module.exports = {
  parse: parse,
  setRegex: setRegex
};
