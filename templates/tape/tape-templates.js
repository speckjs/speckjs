// Utility templates
var tempRequire = 'var {{=it.varName}} = require(\'{{=it.module}}\');';

// Base template for tests (deliberately missing ending syntax - closed in util fx)
var baseTemplate = 'test(\'{{=it.testTitle}}\', function(t) { ';
var planTemplate = 't.plan({{=it.assertions}});';

// Individual assertion templates
var equalTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\');';
var notEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\');';
var notDeepEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\');';
var deepEqualTemplate = 't.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\');';
var okTemplate = 't.{{=it.assertionType}}(file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\');';
var notOkTemplate = 't.{{=it.assertionType}}(file.{{=it.assertionInput}}, \'{{=it.assertionMessage}}\');';

// Export templates
module.exports = {
  require: tempRequire,
  base: baseTemplate,
  plan: planTemplate,
  equal: equalTemplate,
  notEqual: notEqualTemplate,
  deepEqual: deepEqualTemplate,
  notDeepEqual: notDeepEqualTemplate,
  ok: okTemplate,
  notOk: notOkTemplate
};
