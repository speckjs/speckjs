var convert = require('../parsing/comment-conversion.js');
var test = require('tape');

test('comment to assertion conversion', function(t) {
  t.plan(3);

  t.equal(typeof convert.extractTestDetails, 'function', 'Should be a function');
  t.equal(Array.isArray(convert.extractTestDetails(['sum(10,10) == 20 (return the sum of both params)'])),
    true, 'Should output an array');
  t.deepEqual(convert.extractTestDetails(['sum(10,10) == 20 (return the sum of both params)']), [{
    assertionInput: 'sum(10,10)',
    assertionType: 'equal',
    assertionOutput: '20',
    assertionMessage: 'return the sum of both params'
  }], 'Objects in output array should be properly formatted');

});
