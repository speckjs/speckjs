var eol = require('os').EOL;

var indent = function(n) {
  var space = '';
  for (var i=0 ; i < n; i++) {
    space += ' ';
  }
  return space;
};

// Utility templates require chai
var tempRequire = function(it) {
  return 'var ' + (it.varName) + ' = require(\'' + (it.module) + '\');';
};

//Should Execute Statement
var shouldExecute = function(it) {
  return 'var should = chai.should();' + eol;
};

// Base template
var baseTemplate = function(it) {
  return 'describe(\'' + (it.testTitle) + '\', function() { ';
};

// Individual assertion templates
var equalTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'file.' + (it.assertionInput) + '.should.equal(' + (it.assertionOutput) + '));' + eol + indent(2) + '});';
};

var notEqualTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'file.' + (it.assertionInput) + '.should.not.equal(' + (it.assertionOutput) + '));' + eol + indent(2) + '});';
};

var deepEqualTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'file.' + (it.assertionInput) + '.should.deep.equal(' + (it.assertionOutput) + '));' + eol + indent(2) + '});';
};

var notDeepEqualTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'file.' + (it.assertionInput) + '.should.not.deep.equal(' + (it.assertionOutput) + '));' + eol + indent(2) + '});';
};

var greaterThanTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'file.' + (it.assertionInput) + '.should.be.above(' + (it.assertionOutput) + ');' + eol + indent(2) + '});';
};

function generateTemplateFor(assertion) {
  var propertyTemplate = function(it) {
    return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'file.' + (it.assertionInput) + '.should.'+assertion+'(' + (it.assertionOutput) + ');' + eol + indent(2) + '});';
  };
  return propertyTemplate;
}

module.exports = {
  require: tempRequire,
  shouldExecute: shouldExecute,
  base: baseTemplate,
  equal: equalTemplate,
  notEqual: notEqualTemplate,
  deepEqual: deepEqualTemplate,
  notDeepEqual: notDeepEqualTemplate,
  greaterThan: greaterThanTemplate
};

// 
// # Generate additional templates
// 
var templates = {"hasProperty":"have.property"}

for (var template in templates) {
  var template_assertion = templates[template];
  module.exports[template] = generateTemplateFor(template_assertion);
}
