var comments = require('../../src/parsing/parse-comments.js');
var test = require('tape');
var path = require('path');
var fs = require('fs');


test('parse function test', function(t) {
  t.plan(4);
  var singleTest = [ { assertions: [ 'sum(6, 7) == 13 (return the sum of both params)', 'sum(8, 9) == 17 (return the sum of both params)' ], loc: { endLine: 5, startLine: 3 }, title: 'sum function' } ];
  var emptyTest =  [ { assertions: [], loc: { endLine: 3, startLine: 3 }, title: 'sum function' } ];
  var testString = fs.readFileSync(path.join(__dirname, 'testDemoSingle.js'), {encoding: 'utf8'});
  var testStringEmpty = fs.readFileSync(path.join(__dirname, 'testDemoEmpty.js'), {encoding: 'utf8'});
  t.equal(typeof comments.parse, 'function', 'Should be a function');
  t.ok(comments.parse(testString), 'Should output an AST');
  t.deepEqual(comments.parse(testString).tests, singleTest, 'Should output raw test objects with both assertions and test titles');
  t.deepEqual(comments.parse(testStringEmpty).tests, emptyTest, 'Should output a raw test object without an empty assertions array');
});
