// UTILITY TEMPLATES
var tempRequire = 'var {{=it.varName}} = require(\'{{=it.module}}\');';

// BASE TEMPLATE FOR TESTS (deliberately missing ending syntax - closed in util fx)
var baseTemplate =
'test(\'{{=it.testTitle}}\', function(t) { \
t.plan({{=it.assertions}}); \ ';

// INDIVIDUAL ASSERTION TEMPLATES

// EXPORT TEMPLATES
module.exports = {
  require: tempRequire,
  base: baseTemplate
};
