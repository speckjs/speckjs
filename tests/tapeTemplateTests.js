var test = require('tape');

// TEST FIXTURE
var dataObj = {
  specType : 'tape',
  specFileSrc : 'app.js',
  tests : [
    { testTitle: 'sum function',
      assertions: [
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
          assertionType: 'equals',
          assertionInput: 'mult(4, 5)',
          assertionOutput: '20'
        }
      ]
    }
  ]
};

test('tape template function', function (t) {
    t.plan(2); // How many tests?
});
