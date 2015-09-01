var test = require('tape');
var template = require('template-utils.js');
var tapeTemplates = require('tape-templates.js');

// TEST FIXTURE

test('tape template function', function (t) {
    t.plan(3); // How many tests
    //Dummy data for parsed comment
    var emptyTestObj = {
      specType : 'tape',
      specFileSrc : 'app.js',
      tests : [
        { testTitle: 'sum function',
          assertions: []
        }
       ]
    };

    var emptyTestBlock = "test('sum function', function (t) {" +
                          "})";
    //It takes an empty object and outputs an empty test block
    t.equal(template.addTestDataToBaseTemplate(tapeTemplates.baseTemplate, emptyTestObj), emptyTestBlock, 'Takes an test with 0 assertion and outputs a base template');
    //It takes one test block and produces a properly formatted tape test
    //It takes multiple test blocks and produces a properly formatted tape test
    //If a field is missing, return error, missing field
});
