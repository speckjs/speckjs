/*
  ============================================================
  Thatsweet.js: transforming inline comments into unit tests
  ============================================================
  Thatsweet produce sjs syntax file, that can be compiled into
  testSpec.js files via sweet.js ans a set of ad-hoc macros.
*/
var fs = require('fs');
var path = require('path');
// var acorn = require('acorn');
var comments = require('./parsing/parse-comments.js');

// Get the list of the files to be parsed
var files = process.argv.slice(2);


// Create i/o streams for each file
files.forEach(function(fileName) {

  var rStream = fs.createReadStream(path.join(__dirname, fileName));
  // TODO: Writing output path need to be fixed
  // var writeStream = fs.createWriteStream('./srcSpecs/testSpec-' + fileName);
  var data = '';

  rStream.on('data', function(chunk) {
    data += chunk;
  });

  // Once each readable stream buffer is complete,
  // parse it and write the result in the writable stream
  rStream.on('end', function() {
    var parsedBuffer = comments.parse(data);
    console.log(parsedBuffer.tests);

    // console.dir(parsedStream.comments[1].range);




    // writeStream.write(parsedStream.comments[0].value);

    // var cmds = parsedStream.comments[0].value
    //   .substring(6)
    //   .split('\'').join('').split(',')
    //   .map(function(str) {
    //     return str.trim();
    //   });

    // // String sanitization [COWBOY STYLE]
    // // spec, assertions, assertionType, assertionTitle, test, expected
    // var spec = cmds[0];
    // var assertions = cmds[1];
    // var assertionType = cmds[2];
    // var assertionTitle = cmds[3];
    // var test = cmds[4] + cmds[5];
    // var expected = cmds[6];

    // // templates
    // var tempRequire = dot.template('var {{=it.varName}} = require(\'{{=it.module}}\');');


    // var tempTest = dot.template('test(\'{{=it.spec}}\', function(t) {--\
    //     t.plan({{=it.assertions}});--\
    //     t.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\');--\
    //   });');

    // // Write require tape
    // writeStream.write(tempRequire({varName: 'test', module: 'tape'}) + endOfLine);
    // // Write require file
    // writeStream.write(tempRequire({varName: 'file', module: './' + fileName}) + endOfLine);

    // // Write test
    // var testSpec = tempTest({spec: spec, assertions: assertions, assertionType: assertionType, assertionTitle: assertionTitle, test: test, expected: expected})
    //   .split('--');
    // testSpec.forEach(function(partial) {
    //   writeStream.write(partial + endOfLine);
    // });
  });
});
