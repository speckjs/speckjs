var equalTemplate = 't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\')';

module.export = {
  template: equalTemplate
};
