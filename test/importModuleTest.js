var speck = require('../src/speck.js');
var fs = require('fs');
var path = require('path');

var testString1 = fs.readFileSync(path.join(__dirname, '../test/fixtures/base.js'), {encoding: 'utf8'});
var testString2 = fs.readFileSync(path.join(__dirname, '../test/fixtures/base.js'), {encoding: 'utf8'});
var testString3 = fs.readFileSync(path.join(__dirname, '../test/fixtures/base.js'), {encoding: 'utf8'});

var result1 = speck.build({
  name: 'base.js',
  content: testString1
}, {
  testFW: 'jasmine'
});

var result2 = speck.build({
  name: 'base.js',
  content: testString2
}, {
  testFW: 'mocha-chai'
});

var result3 = speck.build({
  name: 'base.js',
  content: testString3
}, {
  testFW: 'tape',
  onBuild: function(data) {
    console.log('Applying a callback:\n', data);
  }
});

console.log(result1);
console.log(result2);
console.log(result3);
