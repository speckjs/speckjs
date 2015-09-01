/*
  ============================================================
  Thatsweet.js: transforming inline comments into unit tests
  ============================================================
  Thatsweet produce sjs syntax file, that can be compiled into
  testSpec.js files via sweet.js ans a set of ad-hoc macros.
*/

var fs = require('fs');
var path = require('path');
var comments = require('./parsing/parse-comments.js');
var extract = require('./parsing/comment-conversion.js');
var tapeTemps = require('./templates/tape/tape-templates.js');
var tempUtils = require('./templates/template-utils.js');

// Get the list of the files to be parsed from command line
var files = process.argv.slice(2);
// OR
// Get the list of files to be parsed from src/
// var files = fs.readdirSync(__dirname + "/src");
console.log('files:', files);

// Create i/o streams for each file
files.forEach(function(fileName) {

  // Look in /src for files to parse (may want to refactor later for more flexibility)
  var rStream = fs.createReadStream(path.join(__dirname, fileName));

  // Gather data from file being read in
  var data = '';
  rStream.on('data', function(chunk) {
    data += chunk;
  });

  // Readable stream buffer is complete- data now ready for use
  rStream.on('end', function() {

    // Get SpeckJS comments from file data (Nick)
    var tests = comments.parse(data).tests;
    var testDetails;

    // Get test details
    for (var i = 0; i < tests.length; i++) {
      // If assertions to be written
      if (tests[i].assertions.length) {
        // Extract test details from parsed comments (Luke)
        testDetails = extract.extractTestDetails(tests[i].assertions);

        // Use testDetails to construct object to send into util function
        var utilData = {
          specType : 'tape',
          specFileSrc : fileName,
          tests : [
            { testTitle: tests[i].title,
              assertions: testDetails
            }
          ]
        }

        // Convert utilData into usable JavaScript test code (Greg)
        var jsTestString = tempUtils.addTestDataToBaseTemplate(tapeTemps.base, utilData);
        console.log(jsTestString);

        // PREPARE TO WRITE jsTestString TO SPEC FILE!
      }
    }

    // Create writeStream to write test code to a spec file
    // var writeStream = fs.createWriteStream('./srcSpecs/testSpec-' + fileName);
    // // Write require tape
    // writeStream.write(tapeTemps.require({varName: 'test', module: 'tape'}) + endOfLine);
    // // Write require file
    // writeStream.write(tapeTemps.require({varName: 'file', module: './' + fileName}) + endOfLine);
    // writeStream.write(jsTestString);
  });





  // NICK'S OLD CODE (FOR REFERENCE)

  // TODO: Writing output path need to be fixed
  // var writeStream = fs.createWriteStream('./srcSpecs/testSpec-' + fileName);

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
  // });
});
