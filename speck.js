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

// Parse command-line arguments
var args = process.argv.slice(2);
var testFW = args[0];
var testPath = args[1];
var files = args.slice(2);

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
    var readyTestsToWrite = [];

    // Get test details
    tests.forEach(function(test) {
      // If assertions to be written
      if (test.assertions.length) {
        // Extract test details from parsed comments (Luke)
        var testDetails = extract.extractTestDetails(test.assertions);

        // Use testDetails to construct object to send into util function
        var utilData = tempUtils.prepDataForTemplating(testFW, fileName, test, testDetails);

        // Convert utilData into usable JavaScript test code (Greg)
        var jsTestString = tempUtils.addTestDataToBaseTemplate(tapeTemps.base, utilData);

        // Add prepared test string to array for later writing
        readyTestsToWrite.push(jsTestString);
      }
    });

    // Write prepared tests to file
    tempUtils.writeToTestFile(testPath, fileName, readyTestsToWrite);
  });
});
