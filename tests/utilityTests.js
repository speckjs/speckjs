var test = require('tape');
var eol = require('os').EOL;
var tempUtils = require('../templates/template-utils.js');

test('utility require function', function (t) {
  t.plan(2);
  t.equal(tempUtils.addRequire('test', 'tape'), 'var test = require(\'tape\');' + eol, 'Adds a require statement for tape with the test var name');
  t.equal(tempUtils.addRequire('assert', 'assert'), 'var assert = require(\'assert\');' + eol, 'Adds a require statement for node assert library');
});

test('Assemble test file function', function (t) {
  var tests = 'test(\'sum function\', function (t) {' + eol + '  ' +
              't.plan(2);' + eol +'  ' +
              't.equal(13, file.sum(6, 7), \'return the sum of both params\');' + eol + '  ' +
              't.equal(17, file.sum(8, 9), \'return the sum of both params\');' + eol +
            ')};';
  var testFile = tempUtils.assembleTestFile('demo.js', tests, 'tape');
  var expectedOutput = 'var test = require(\'tape\');' + eol + 'var file = require(\'demo.js\');' + eol + eol +
                  'test(\'sum function\', function (t) {' + eol + '  ' +
                  't.plan(2);' + eol +'  ' +
                  't.equal(13, file.sum(6, 7), \'return the sum of both params\');' + eol + '  ' +
                  't.equal(17, file.sum(8, 9), \'return the sum of both params\');' + eol +
                ')};';
  t.plan(1);
  t.equal(testFile, expectedOutput, 'Function properly assembles string to be written to spec file');
});

test('Prepare data for templating function', function (t) {
  var testData = tempUtils.prepDataForTemplating('tape', 'test.js', {title: 'Sum Function'}, {
    assertionInput: 'diff(3,2)',
    assertionType: 'equal',
    assertionOutput: '1',
    assertionMessage: 'return the diff of both params'
  });
  t.plan(7);
  t.equal(testData.specType, 'tape', 'Function properly formats spec type in new object');
  t.equal(testData.specFileSrc, 'test.js', 'Function properly formats spec file source in new object');
  t.equal(testData.tests[0].testTitle, 'Sum Function', 'Function properly formats test title in nested object');
  t.equal(testData.tests[0].assertions.assertionInput, 'diff(3,2)', 'Function properly formats assertion input in new object');
  t.equal(testData.tests[0].assertions.assertionType, 'equal', 'Function properly formats assertion type in new object');
  t.equal(testData.tests[0].assertions.assertionOutput, '1', 'Function properly formats assertion output in new object');
  t.equal(testData.tests[0].assertions.assertionMessage, 'return the diff of both params', 'Function properly formats assertion message in new object');
});
