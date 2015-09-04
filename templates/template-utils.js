var fs = require('fs');
var dot = require('dot');
var tapeTemps = require('./tape/tape-templates.js');
var jasmineTemps = require('./jasmine/jasmine-templates.js');

/*
  Create require statement from given args.
  input:  (String) variable name assigned with required module.
  input:  (String) module name you want to require.
  output: (String) require statement using given arguments.
*/
exports.addRequire = function(varName, module) {
  return dot.template(tapeTemps.require)({
    varName: varName,
    module: module
  });
};


/*
  Function that transforms an object into JavaScript test code.
  input:  (String) base-template to build upon with each test and its respective assertions.
  input:  (Object) test data from parsed comments.
  output: (String) interpolated test block.
*/
exports.addTestDataToBaseTemplate = function(baseTemp, data) {
  var tests = data.tests;
  var result = '';

  // For each test
  for (var i=0; i < tests.length; i++) {
    // Add title and assertion count to baseTemp
    var currentTest = dot.template(baseTemp)({testTitle: tests[i].testTitle,
                                              assertions: tests[i].assertions.length}) + '\n';

    // For each assertion in test
    for (var j=0; j < tests[i].assertions.length; j++) {
      var tempToAdd = tapeTemps[tests[i].assertions[j].assertionType];
      var compiledAssertToAdd = dot.template(tempToAdd)(tests[i].assertions[j]);

      // Add filled-in template to currentTest
      currentTest += compiledAssertToAdd + '\n';
    }

    // Close currentTest block and add to result
    result += currentTest + '}); \n';
  }

  // Return string representing interpolated test block
  return result;
};

/*
  Function that transforms an object into JavaScript test code.
  input:  (String) base-template to build upon with each test and its respective assertions.
  input:  (Object) test data from parsed comments.
  output: (String) interpolated test block.
*/
exports.addTestDataToBaseTemplateJasmine = function(baseTemp, data){
  var tests = data.tests;
  var result = '';

  // For each test
  for (var i=0; i < tests.length; i++) {
    // Add title and assertion count to baseTemp
    var currentTest = dot.template(baseTemp)({testTitle: tests[i].testTitle,
                                              assertions: tests[i].assertions.length}) + '\n';

    // For each assertion in test
    for (var j=0; j < tests[i].assertions.length; j++) {
      var tempToAdd = jasmineTemps[tests[i].assertions[j].assertionType];
      var compiledAssertToAdd = dot.template(tempToAdd)(tests[i].assertions[j]);

      // Add filled-in template to currentTest
      currentTest += compiledAssertToAdd + '\n';
    }

    // Close currentTest block and add to result
    result += currentTest + '}); \n';
  }

  // Return string representing interpolated test block
  return result;
};


/*
  Creates an object in the format that the templating helper function expects.
  input:  (String) path to where you want new test file saved.
  input:  (String) name used to create test file.
  input:  (String) String ready to be written to file.
  output: (Object) properly formatted test object ready for templating
*/
exports.prepDataForTemplating = function(testFW, fileName, currentTest, testDetails) {
  return {
    specType : testFW,
    specFileSrc : fileName,
    tests : [
      { testTitle: currentTest.title,
        assertions: testDetails
      }
    ]
  };
};


/*
  Writes String to new test file.
  input:  (String) path to where you want new test file saved.
  input:  (String) name used to create test file.
  input:  (Array) strings ready to be written to file.
  output: null.
*/
exports.writeToTestFile = function(testPath, fileName, tests) {
  // Logic for creating filename assumes it needs the following done: slice removes '/src', split removes '.js'
  var specFilePath = testPath + fileName.slice(4).split('.')[0] + '-spec.js';
  var writeStream = fs.createWriteStream(specFilePath);

  // Write require statements for testing library and parsed file
  writeStream.write(exports.addRequire('test', 'tape'));
  writeStream.write(exports.addRequire('file', '../' + fileName));

  // Write tests to file
  tests.forEach(function(test) {
    writeStream.write(test);
  });
  writeStream.end();
};
