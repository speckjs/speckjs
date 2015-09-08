var test = require('tape');
var eol = require('os').EOL;
var tempUtils = require('../templates/template-utils.js');

test('utility require function', function (t) {
  t.plan(2);
  t.equal(tempUtils.addRequire('test', 'tape'), 'var test = require(\'tape\');' + eol, 'Adds a require statement for tape with the test var name');
  t.equal(tempUtils.addRequire('assert', 'assert'), 'var assert = require(\'assert\');' + eol, 'Adds a require statement for node assert library');
});

test('Add test data to base tape tempalte function', function (t) {

});

test('Add test data to base jasmine template function', function (t) {

});

test('Prepare data for templating function', function (t) {

});

test('Assemble test file function', function (t) {

});
