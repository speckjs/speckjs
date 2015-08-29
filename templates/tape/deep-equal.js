var dot = require('dot');

var deepEqualTemplate = dot.template(
't.{{=it.assertionType}}({{=it.expected}}, file.{{=it.test}}, \'{{=it.assertionTitle}}\')'
);

module.export = {
  template: deepEqualTemplate
};
