var test = require('tape');
var tempUtils = require('../templates/template-utils.js');
var tapeTemps = require('../templates/tape/tape-templates.js');

// TEST FIXTURE

test('tape template function', function (t) {
    t.plan(3); // How many tests?
    //Dummy data for parsed comment
    var dataObj = {
      specType : 'tape',
      specFileSrc : 'app.js',
      tests : [
        { testTitle: 'sum function',
          assertions: [
            { assertionMessage: 'return the sum of both params',
              assertionType: 'equal',
              assertionInput: 'sum(6, 7)',
              assertionOutput: '13'
            },
            { assertionMessage: 'return the sum of both params',
              assertionType: 'equal',
              assertionInput: 'sum(8, 9)',
              assertionOutput: '17'
            }
          ]
        },
        { testTitle: 'multiply function',
          assertions: [
            { assertionMessage: 'return the product of both params',
              assertionType: 'equal',
              assertionInput: 'mult(4, 5)',
              assertionOutput: '20'
            }
          ]
        }
      ]
    };

    var emptyTestObj = {
      specType : 'tape',
      specFileSrc : 'app.js',
      tests : [
        { testTitle: 'sum function',
          assertions: []
        }
      ]
    };

    var singleTestObj = {
      specType : 'tape',
      specFileSrc : 'app.js',
      tests : [
        { testTitle: 'sum function',
          assertions: [
          { assertionMessage: 'return the sum of both params',
            assertionType: 'equal',
            assertionInput: 'sum(6, 7)',
            assertionOutput: '13'
          },
          { assertionMessage: 'return the sum of both params',
            assertionType: 'equal',
            assertionInput: 'sum(8, 9)',
            assertionOutput: '17'
          }
          ]
      }
      ]
    };

    var errorObj = {
      specType : 'tape',
      specFileSrc : 'app.js',
      tests : [
        { testTitle: 'sum function',
          assertions: [
          { assertionMessage: 'return the sum of both params',
            assertionInput: 'sum(6, 7)',
            assertionOutput: '13'
          },
          { assertionMessage: 'return the sum of both params',
            assertionType: 'equal',
            assertionInput: 'sum(8, 9)',
            assertionOutput: '17'
          }
          ]
      }
      ]
    };

    var normalTestBlock = 'test(\'sum function\', function (t) {' +
                            't.equal(sum(6, 7), 13, \'return the sum of both params\')' +
                            't.equal(sum(8, 9), 17, \'return the sum of both params\')' +
                          ')}' +
                          'test(\'multiply function\', function (t) {' +
                            't.equal(multiply(4, 5), 20, \'return the product of both params\')' +
                          ')}';
    var singleTestBlock = 'test(\'sum function\', function (t) {' +
                            't.equal(sum(6, 7), 13, \'return the sum of both params\')' +
                            't.equal(sum(8, 9), 17, \'return the sum of both params\')' +
                          ')}';
    var emptyTestBlock = 'test(\'sum function\', function (t) {' +
                          '})';
    // //It takes an empty object and outputs an empty test block
    t.equal(tempUtils.addTestDataToBaseTemplate(tapeTemps.base, emptyTestObj), emptyTestBlock, 'Takes an test with 0 assertion and outputs a base template');
    // //It takes one test block and produces a properly formatted tape test
    t.equal(tempUtils.addTestDataToBaseTemplate(tapeTemps.base, singleTestObj), singleTestBlock, 'Takes an test with 0 assertion and outputs a base template');
    //It takes multiple test blocks and produces a properly formatted tape test
    t.equal(tempUtils.addTestDataToBaseTemplate(tapeTemps.base, dataObj), normalTestBlock, 'Takes a properly formatted object and outputs a formatted test block');
    //If a field is missing, return error, missing field
    // t.equal(tempUtils.addTestDataToBaseTemplate(tapeTemps.base, errorObj), 'Please provide properly formatted comment', 'Takes an incorrectly formatted object and returns an error message');
  });
