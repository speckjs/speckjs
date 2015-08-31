var dot = require('dot');
var tape = require('tape');
var tapeTemps = require('./tape-templates.js');

// TEST FIXTURE
var dataObj = {
  specType : 'tape',
  specFileSrc : 'app.js',
  tests : [
    { testTitle: 'sum function',
      assertions: [
        { assertionMessage: 'return the sum of both params',
          assertionType: 'pass',
          assertionInput: 'sum(1, 2)',
          assertionOutput: '3'
        },
        { assertionMessage: 'return the sum of both params',
          assertionType: 'fail',
          assertionInput: 'sum(4, 5)',
          assertionOutput: '100'
        },
        { assertionMessage: 'return the sum of both params',
          assertionType: 'equals',
          assertionInput: 'sum(6, 7)',
          assertionOutput: '13'
        },
        { assertionMessage: 'return the sum of both params',
          assertionType: 'equals',
          assertionInput: 'sum(8, 9)',
          assertionOutput: '17'
        }
      ]
    },
    { testTitle: 'multiply function',
      assertions: [
        { assertionMessage: 'return the product of both params',
          assertionType: 'pass',
          assertionInput: 'mult(2, 3)',
          assertionOutput: '6'
        },
        { assertionMessage: 'return the product of both params',
          assertionType: 'fail',
          assertionInput: 'mult(4, 5)',
          assertionOutput: '15'
        },
        { assertionMessage: 'return the product of both params',
          assertionType: 'equals',
          assertionInput: 'mult(4, 5)',
          assertionOutput: '20'
        }
      ]
    }
  ]
};

/*
PLAN OF ATTACK:
DYNAMICALLY BUILD UP STRING TO SEND INTO dot.template()

util function that takes as input (baseTemplate, dataObj) =>
  function iterates through dataObj's assertions array
    create strings for each assertion to add to baseTemplate
  call dot.template with built up baseTemplate =>
    returns a function to use original current assertion with
*/

var addTestDataToBaseTemplate = function(baseTemp, data) {
  var tests = data.tests;
  var result = '';

  // FOR EACH TEST
  for (var i=0; i < tests.length; i++) {
    // ADD TITLE AND ASSERTION COUNT TO baseTemp
    var currentTest =  dot.template(baseTemp)({ testTitle: tests[i].testTitle,
                                                assertions: tests[i].assertions.length}) + '\n';

    // FOR EACH ASSERTION IN TEST
    for (var j=0; j < tests[i].assertions.length; j++) {
      var tempToAdd = tapeTemps[tests[i].assertions[j].assertionType];
      var compiledAssertToAdd = dot.template(tempToAdd)(tests[i].assertions[j]);

      // baseTemp += tempToAdd;                  // IF YOU WANT AN EMPTY TEMPLATE
      currentTest += compiledAssertToAdd + '\n'; // IF YOU WANT A FILLED-IN TEMPLATE
    }

    // CLOSE currentTest BLOCK AND ADD TO result
    result += currentTest + "}); \n";
  }

  return result;
};

var filledInTest = addTestDataToBaseTemplate(tapeTemps.base, dataObj);
console.log(filledInTest);
