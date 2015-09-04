// Utility templates
var tempRequire = 'var {{=it.varName}} = require(\'{{=it.module}}\');';

// Base template
var baseTemplate = 'describe(\'{{=it.testTitle}}\', function() { ';

// Individual assertion templates
var equalTemplate = 'it(\'{{=it.assertionMessage}}\', function() {\nexpect(file.{{=it.assertionInput}}{{=it.assertionType}}({{=it.assertionOutput}}))\n});';
var notEqualTemplate = 'it(\'{{=it.assertionMessage}}\', function() {\nexpect(file.{{=it.assertionInput}}{{=it.assertionType}}({{=it.assertionOutput}}))\n});';

module.exports = {
  require: tempRequire,
  base: baseTemplate,
  equal: equalTemplate,
  notEqual: notEqualTemplate
  //Commented these out since we will be implementing them soon
  //deepEqual: deepEqualTemplate,
  //notDeepEqual: notDeepEqualTemplate
};
