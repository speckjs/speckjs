var comments = require('../parsing/parse-comments.js');
var test = require('tape');
var path = require('path');
var fs = require('fs');


test('parse function test', function(t) {
  t.plan(2);
  var singleTest = [ { assertions: [ 'sum(6, 7) == 13 (return the sum of both params)', 'sum(8, 9) == 17 (return the sum of both params)' ], loc: { endLine: 5, startLine: 3 }, title: 'sum function' } ];
  var emptyTest =  [ { assertions: [], loc: { endLine: 3, startLine: 3 }, title: 'sum function' } ];
  var testString = fs.readFileSync(path.join(__dirname, 'testDemoSingle.js'), {encoding: 'utf8'});
  var testStringEmpty = fs.readFileSync(path.join(__dirname, 'testDemoEmpty.js'), {encoding: 'utf8'});

  t.deepEqual(comments.parse(testString).tests, singleTest, 'Returns an array of raw test objects with both assertions and titles');
  t.deepEqual(comments.parse(testStringEmpty).tests, emptyTest, 'Returns an array of empty assertions and test title');
});
