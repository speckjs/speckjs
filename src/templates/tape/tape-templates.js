var eol = require('os').EOL;

//Utility templates
var tempRequire = function(it) {
  return 'var ' + (it.varName) + ' = require(\'' + (it.module) + '\');' + eol;
};

//Base template
var baseTemplate = function(it) {
  return 'test(\'' + (it.testTitle) + '\', function(t) { ' + eol;
};

var planTemplate = function(it) {
  return 't.plan(' + (it.assertions) + ');' + eol;
};

//Individual Assertion templates
var equalTemplate = function(it) {
  return 't.' + (it.assertionType) + '(' + (it.assertionOutput) + ', file.' + (it.assertionInput) + ', \'' + (it.assertionMessage) + '\');';
};

var notEqualTemplate = function(it) {
  return 't.' + (it.assertionType) + '(' + (it.assertionOutput) + ', file.' + (it.assertionInput) + ', \'' + (it.assertionMessage) + '\');';
};

var notDeepEqualTemplate = function(it) {
  return 't.' + (it.assertionType) + '(' + (it.assertionOutput) + ', file.' + (it.assertionInput) + ', \'' + (it.assertionMessage) + '\');';
};

var deepEqualTemplate = function(it) {
  return 't.' + (it.assertionType) + '(' + (it.assertionOutput) + ', file.' + (it.assertionInput) + ', \'' + (it.assertionMessage) + '\');';
};

var okTemplate = function(it) {
  return 't.' + (it.assertionType) + '(file.' + (it.assertionInput) + ', \'' + (it.assertionMessage) + '\');';
};

var notOkTemplate = function(it) {
  return 't.' + (it.assertionType) + '(file.' + (it.assertionInput) + ', \'' + (it.assertionMessage) + '\');';
};

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
