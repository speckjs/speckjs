// UTILITY TEMPLATES
var tempRequire = 'var {{=it.varName}} = require(\'{{=it.module}}\');';

// BASE TEMPLATE FOR TESTS (deliberately missing ending syntax - closed in util fx)
var baseTemplate =
'test(\'{{=it.testTitle}}\', function(t) { \
t.plan({{=it.assertions}}); \ ';

// INDIVIDUAL ASSERTION TEMPLATES (Zach's)
// var equalTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\') \n';
// var notEqualTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\') \n';
// var notDeepEqualTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\') \n';
// var deepEqualTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\') \n';

// INDIVIDUAL ASSERTION TEMPLATES (Luke's)
var equalTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\') \n';
var notEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\') \n';
var notDeepEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\') \n';
var deepEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\') \n';

// EXPORT TEMPLATES
module.exports = {
  require: tempRequire,
  base: baseTemplate,
  equal: equalTemplate,
  notEqual: notEqualTemplate,
  deepEqual: deepEqualTemplate,
  notDeepEqual: notDeepEqualTemplate
};
