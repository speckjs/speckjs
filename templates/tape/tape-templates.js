// UTILITY TEMPLATES
var tempRequire = "var {{=it.varName}} = require('{{=it.module}}');";

// BASE TEMPLATE FOR TESTS (deliberately missing ending syntax - closed in util fx)
var baseTemplate =
"test('{{=it.testTitle}}', function(t) { \
t.plan({{=it.assertions}}); \ ";

// INDIVIDUAL ASSERTION TEMPLATES
var passTemplate = "t.{{=it.assertionType}}('{{=it.assertionMessage}}'); \n";
var failTemplate = "t.{{=it.assertionType}}('{{=it.assertionMessage}}'); \n";
var equalsTemplate = "t.{{=it.assertionType}}({{=it.assertionOutput}}, file.{{=it.assertionInput}}, '{{=it.assertionMessage}}'); \n";

// EXPORT TEMPLATES
module.exports = {
  require: tempRequire,
  base: baseTemplate,
  pass: passTemplate,
  fail: failTemplate,
  equals: equalsTemplate
};
