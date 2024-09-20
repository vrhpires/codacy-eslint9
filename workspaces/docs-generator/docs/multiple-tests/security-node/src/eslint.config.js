// eslint.config.js
const securityNodePlugin = require('eslint-plugin-security-node');

module.exports = [
  {
    plugins: {
      'security-node': securityNodePlugin,
    },
    rules: {
      'security-node/non-literal-reg-expr': 'warn',
    },
  },
];
