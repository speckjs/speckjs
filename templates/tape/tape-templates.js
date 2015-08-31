var equalTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\') \n';
var notEqualTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\') \n';
var notDeepEqualTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\') \n';
var deepEqualTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\') \n';

module.exports = {
  equal: equalTemplate,
  notEqual: notEqualTemplate,
  deepEqual: deepEqualTemplate,
  notDeepEqual: notDeepEqualTemplate
};
