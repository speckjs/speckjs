var eol = require('os').EOL;

var indent = function(n) {
  var space = '';
  for (var i=0 ; i < n; i++) {
    space += ' ';
  }
  return space;
};

// Utility templates
var tempRequire = function(it) {
  return 'var ' + (it.varName) + ' = require(\'' + (it.module) + '\');';
};

var assertRequire = function(it) {
  return 'var assert = require(\'assert\');';
};

// Base template
var baseTemplate = function(it) {
  return 'describe(\'' + (it.testTitle) + '\', function() { ';
};

// Individual assertion templates
var equalTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'expect(file.' + (it.assertionInput) + '.toBe(' + (it.assertionOutput) + '))' + eol + indent(2) + '});';
};

var notEqualTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'expect(file.' + (it.assertionInput) + '.not.toBe(' + (it.assertionOutput) + '))' + eol + indent(2) + '});';
};

var deepEqualTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'var pass;' + eol + indent(4) +'try {' + eol + indent(6) + 'pass = true;' + eol + indent(6) + 'assert.deepEqual(file.' + (it.assertionInput) + ', ' + (it.assertionOutput) + ');' + eol + indent(4) + '} catch (e) {' + eol + indent(6) + 'pass = false;' + eol + indent(4) + '}' + eol + indent(4) + 'expect(pass).toBe(true);' + eol + indent(2) + '});' + eol;
};

var notDeepEqualTemplate = function(it) {
  return indent(2) + 'it(\'' + (it.assertionMessage) + '\', function() {' + eol + indent(4) + 'var pass;' + eol + indent(4) +'try {' + eol + indent(6) + 'pass = true;' + eol + indent(6) + 'assert.notDeepEqual(file.' + (it.assertionInput) + ', ' + (it.assertionOutput) + ');' + eol + indent(4) + '} catch (e) {' + eol + indent(6) + 'pass = false;' + eol + indent(4) +'}' + eol + indent(4) + 'expect(pass).toBe(true);' + eol + indent(2) + '});' + eol;
};

module.exports = {
  require: tempRequire,
  assert: assertRequire,
  base: baseTemplate,
  equal: equalTemplate,
  notEqual: notEqualTemplate,
  deepEqual: deepEqualTemplate,
  notDeepEqual: notDeepEqualTemplate
};
