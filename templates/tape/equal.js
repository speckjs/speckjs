var dot = require('dot');

var equalTemplate = dot.template(
't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\')'
);

module.export = {
  template: equalTemplate
};
