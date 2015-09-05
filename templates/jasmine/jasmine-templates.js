// Utility templates
var tempRequire = 'var {{=it.varName}} = require(\'{{=it.module}}\');';
var assertRequire = 'var assert = require(\'assert\');';

// Base template
var baseTemplate = 'describe(\'{{=it.testTitle}}\', function() { ';

// Individual assertion templates
var equalTemplate = 'it(\'{{=it.assertionMessage}}\', function() {\nexpect(file.{{=it.assertionInput}}.toBe({{=it.assertionOutput}}))\n});';
var notEqualTemplate = 'it(\'{{=it.assertionMessage}}\', function() {\nexpect(file.{{=it.assertionInput}}.not.toBe({{=it.assertionOutput}}))\n});';
var deepEqualTemplate = 'it(\'{{=it.assertionMessage}}\', function() {\nvar pass;\ntry {\npass = true;\nassert.deepEqual(file.{{=it.assertionInput}}, {{=it.assertionOutput}});\n} catch (e) {\npass = false;\n}\nexpect(pass).toBe(true);\n});\n';
var notDeepEqualTemplate = 'it(\'{{=it.assertionMessage}}\', function() {\nvar pass;\ntry {\npass = true;\nassert.notDeepEqual(file.{{=it.assertionInput}}, {{=it.assertionOutput}});\n} catch (e) {\npass = false;\n}\nexpect(pass).toBe(true);\n});\n';

module.exports = {
  require: tempRequire,
  assert: assertRequire,
  base: baseTemplate,
  equal: equalTemplate,
  notEqual: notEqualTemplate,
  deepEqual: deepEqualTemplate,
  notDeepEqual: notDeepEqualTemplate
};
