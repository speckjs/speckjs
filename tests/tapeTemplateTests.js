var test = require('tape');
var tempUtils = require('../templates/template-utils.js');
var tapeTemps = require('../templates/tape/tape-templates.js');
var eol = require('os').EOL;
var speck = require('../speck.js');
var path = require('path');
var fs = require('fs');

// TEST FIXTURE

test('tape template function', function (t) {
    t.plan(3); // How many tests?
    var testStringNormal = fs.readFileSync(path.join(__dirname, 'testDemoNormal.js'), {encoding: 'utf8'});
    var testStringSingle = fs.readFileSync(path.join(__dirname, 'testDemoSingle.js'), {encoding: 'utf8'});
    var testStringEmpty = fs.readFileSync(path.join(__dirname, 'testDemoEmpty.js'), {encoding: 'utf8'});
    var normalTestBlock = 'var test = require(\'tape\');' + eol + 'var file = require(\'testDemoNormal.js\');' + eol + eol +
                          'test(\'sum function\', function (t) {' + eol + '  ' +
                            't.plan(2)' + eol + '  ' +
                            't.equal(13, file.sum(6, 7), \'return the sum of both params\');' + eol + '  ' +
                            't.equal(17, file.sum(8, 9), \'return the sum of both params\');' + eol +
                          ')}' + eol + eol +
                          'test(\'multiply function\', function (t) {' + eol + '  ' +

                            't.equal(20, file.multiply(4, 5), \'return the product of both params\');' + eol +
                          ')}';
    var singleTestBlock = 'test(\'sum function\', function (t) {' + eol + '  ' +
                            't.plan(2)' + eol +'  ' +
                            't.equal(13, file.sum(6, 7), \'return the sum of both params\');' + eol + '  ' +
                            't.equal(17, file.sum(8, 9), \'return the sum of both params\');' + eol +
                          ')}';
    var emptyTestBlock = 'test(\'sum function\', function (t) {' + eol +
                          '})';
    //It takes an empty object and outputs an empty test block
    t.equal(speck.build({ name: 'testDemoEmpty.js', content: testStringEmpty }, { testFW: 'tape' }), emptyTestBlock, 'Takes a properly formatted object and outputs a formatted test block');
    //It takes one test block and produces a properly formatted tape test
    t.equal(speck.build({ name: 'testDemoSingle.js', content: testStringSingle }, { testFW: 'tape' }), singleTestBlock, 'Takes a properly formatted object and outputs a formatted test block');
    //It takes multiple test blocks and produces a properly formatted tape test
    t.equal(speck.build({ name: 'testDemoNormal.js', content: testStringNormal }, { testFW: 'tape' }), normalTestBlock, 'Takes a properly formatted object and outputs a formatted test block');
    //If a field is missing, return error, missing field
    // t.equal(tempUtils.addTestDataToBaseTemplate(tapeTemps.base, errorObj), 'Please provide properly formatted comment', 'Takes an incorrectly formatted object and returns an error message');
  });
