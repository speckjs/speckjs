var test = require('tape');
var eol = require('os').EOL;
var speck = require('../speck.js');
var path = require('path');
var fs = require('fs');

// TEST FIXTURE

test('tape template function', function (t) {
    t.plan(6); // How many tests?
    var testStringNormal = fs.readFileSync(path.join(__dirname, 'testDemoNormal.js'), {encoding: 'utf8'});
    var testStringSingle = fs.readFileSync(path.join(__dirname, 'testDemoSingle.js'), {encoding: 'utf8'});
    var testStringEmpty = fs.readFileSync(path.join(__dirname, 'testDemoEmpty.js'), {encoding: 'utf8'});
    var normalTapeTestBlock = 'var test = require(\'tape\');' + eol + 'var file = require(\'testDemoNormal.js\');' + eol + eol +
                          'test(\'sum function\', function (t) {' + eol + '  ' +
                            't.plan(2);' + eol + '  ' +
                            't.equal(13, file.sum(6, 7), \'return the sum of both params\');' + eol + '  ' +
                            't.equal(17, file.sum(8, 9), \'return the sum of both params\');' + eol +
                          ')};' + eol + eol +
                          'test(\'multiply function\', function (t) {' + eol + '  ' +
                            't.equal(20, file.multiply(4, 5), \'return the product of both params\');' + eol +
                          ')};';
    var singleTapeTestBlock = 'var test = require(\'tape\');' + eol + 'var file = require(\'testDemoNormal.js\');' + eol + eol +
                          'test(\'sum function\', function (t) {' + eol + '  ' +
                            't.plan(2);' + eol +'  ' +
                            't.equal(13, file.sum(6, 7), \'return the sum of both params\');' + eol + '  ' +
                            't.equal(17, file.sum(8, 9), \'return the sum of both params\');' + eol +
                          ')};';
    var emptyTapeTestBlock = 'var test = require(\'tape\');' + eol + eol +
                          'test(\'sum function\', function (t) {' + eol +
                          '});';
    var normalJasmineTestBlock = 'var assert = require(\'assert\');' + eol + 'var jasmine = require(\'jasmine\');' + eol + 'var file = require(\'testDemoNormal.js\');' + eol + eol +
                          'describe(\'sum function\', function () {' + eol + '  ' +
                            'it(\'return the sum of both params\', function() {' + eol + '    ' +
                               'expect(file.sum(6, 7)).toBe(13);' + eol + '  ' +
                            '});' + eol + '  ' +
                            'it(\'return the sum of both params\', function() {' + eol + '    ' +
                               'expect(file.sum(8, 9)).toBe(17);' + eol + '  ' +
                            '});' + eol +
                          ')};' + eol + eol +
                          'describe(\'multiply function\', function () {' + eol + '  ' +
                            'it(\'return the product of both params\', function() {' + eol + '    ' +
                               'expect(file.multiply(4, 5)).toBe(20);' + eol + '  ' +
                            '});' + eol +
                          ')};';
    var singleJasmineTestBlock = 'var assert = require(\'assert\');' + eol + 'var jasmine = require(\'jasmine\');' + eol + 'var file = require(\'testDemoNormal.js\');' + eol + eol +
                          'describe(\'sum function\', function () {' + eol + '  ' +
                            'it(\'return the sum of both params\', function() {' + eol + '    ' +
                               'expect(file.sum(6, 7)).toBe(13);' + eol + '  ' +
                            '});' + eol + '  ' +
                            'it(\'return the sum of both params\', function() {' + eol + '    ' +
                               'expect(file.sum(8, 9)).toBe(17);' + eol + '  ' +
                            '});' + eol +
                          ')};';
    var emptyJasmineTestBlock = 'var assert = require(\'assert\');' + eol + 'var jasmine = require(\'jasmine\');' + eol + 'var file = require(\'testDemoNormal.js\');' + eol + eol +
                          'describe(\'sum function\', function () {' + eol +
                          ')};';
    t.equal(speck.build({ name: 'testDemoEmpty.js', content: testStringEmpty }, { testFW: 'tape' }), emptyTapeTestBlock, 'Takes in a commented test file and outputs an empty tape test');
    t.equal(speck.build({ name: 'testDemoSingle.js', content: testStringSingle }, { testFW: 'tape' }), singleTapeTestBlock, 'Takes in a commented test file and outputs a single tape test');
    t.equal(speck.build({ name: 'testDemoNormal.js', content: testStringNormal }, { testFW: 'tape' }), normalTapeTestBlock, 'Takes in a commented test file and outputs multiple tape tests');
    t.equal(speck.build({ name: 'testDemoEmpty.js', content: testStringEmpty }, { testFW: 'jasmine' }), emptyJasmineTestBlock, 'Takes in a commented test file and outputs an empty jasmine test');
    t.equal(speck.build({ name: 'testDemoSingle.js', content: testStringSingle }, { testFW: 'jasmine' }), singleJasmineTestBlock, 'Takes in a commented test file and outputs a single jasmine test');
    t.equal(speck.build({ name: 'testDemoNormal.js', content: testStringNormal }, { testFW: 'jasmine' }), normalJasmineTestBlock, 'Takes in a commented test file and outputs multiple jasmine tests');
  });
