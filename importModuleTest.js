var speck = require('./speck.js');
var fs = require('fs');
var path = require('path');

var testString1 = fs.readFileSync(path.join(__dirname, 'src/demo.js'), {encoding: 'utf8'});
var testString2 = fs.readFileSync(path.join(__dirname, 'src/demo.js'), {encoding: 'utf8'});
var testString3 = fs.readFileSync(path.join(__dirname, 'src/demo.js'), {encoding: 'utf8'});

var result1 = speck.build({
  name: 'demo.js',
  content: testString1
}, {
  testFW: 'tape'
});

var result2 = speck.build({
  name: 'demo.js',
  content: testString2
}, {
  testFW: 'tape'
});

console.log('TS1:', result1);
console.log('TS2:', result2);

speck.build({
  name: 'demo.js',
  content: testString3
}, {
  testFW: 'tape',
  onBuild: function(res) {
    console.log('result callback:');
    console.log(res);
  }
});
