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
var jasmineTemps = require('./templates/jasmine/jasmine-templates.js');
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
    var testsReadyToWrite = [];

    // Get test details
    tests.forEach(function(test) {
      // If assertions to be written
      if (test.assertions.length) {
        // Extract test details from parsed comments (Luke)
        var testDetails = extract.extractTestDetails(test.assertions);

        // Use testDetails to construct object to send into util function
        var utilData = tempUtils.prepDataForTemplating(testFW, fileName, test, testDetails);

        // Convert utilData into usable JavaScript test code (Greg)
        // Conditional to find out whether specType is tape or jasmine
        if (utilData.specType === 'tape') {
          var jsTestString = tempUtils.addTestDataToBaseTemplate(tapeTemps.base, utilData);
          // Add prepared test string to array for later writing
          //Add result of condtional into this
          testsReadyToWrite.push(jsTestString);
        }
        if (utilData.specType === 'jasmine') {
          var jasmineTestString = tempUtils.addTestDataToBaseTemplateJasmine(jasmineTemps.base, utilData);
          testsReadyToWrite.push(jasmineTestString);
        }
      }
    });

    // Write prepared tests to file
    tempUtils.writeToTestFile(testPath, fileName, testsReadyToWrite, testFW);
  });
});


// var dataObj = {
//       specType : 'jasmine',
//       specFileSrc : 'app.js',
//       tests : [
//         { testTitle: 'sum function',
//           assertions: [
//             { assertionMessage: 'return the sum of both params',
//               assertionType: 'equal',
//               assertionInput: 'sum(6, 7)',
//               assertionOutput: '13'
//             },
//             { assertionMessage: 'return the sum of both params',
//               assertionType: 'equal',
//               assertionInput: 'sum(8, 9)',
//               assertionOutput: '17'
//             }
//           ]
//         },
//         { testTitle: 'multiply function',
//           assertions: [
//             { assertionMessage: 'return the product of both params',
//               assertionType: 'equal',
//               assertionInput: 'mult(4, 5)',
//               assertionOutput: '20'
//             }
//           ]
//         }
//       ]
//     };
// if(dataObj.specType === 'jasmine'){
// console.log(dataObj.specType);
// console.log(tempUtils.addTestDataToBaseTemplateJasmine(jasmineTemps.base, dataObj));
// }
