// Utility templates
var tempRequire = 'var {{=it.varName}} = require(\'{{=it.module}}\');';

// Base template for tests (deliberately missing ending syntax - closed in util fx)
var baseTemplate =
'test(\'{{=it.testTitle}}\', function(t) { \
t.plan({{=it.assertions}}); \ ';

// Individual assertion templates
var equalTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\') \n';
var notEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\') \n';
var notDeepEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\') \n';
var deepEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\') \n';

// Export templates
module.exports = {
  require: tempRequire,
  base: baseTemplate,
  equal: equalTemplate,
  notEqual: notEqualTemplate,
  deepEqual: deepEqualTemplate,
  notDeepEqual: notDeepEqualTemplate
};
