const { join } = require('path');

module.exports = {
  sourceFile: join(__dirname, '..', '..', 'node_modules', 'react-dom', 'umd', 'react-dom.development.js'),
  sourceSelectSteps: [
    o => o.body,
    function(o) {
      if (o.type === 'ExpressionStatement') {
        if (o.expression && o.expression.type && o.expression.type === 'CallExpression') {
          return o;
        }
      }
      return false;
    },
    o => o.expression,
    o => o.arguments,
    o => o.type === 'FunctionExpression' ? o : false,
    o => o.body
  ],
  targetSelectSteps: [
    o => o.body,
    o => (o.type === 'VariableDeclaration' ? o : false),
    o => o.declarations,
    o => (o.type === 'VariableDeclarator' ? o : false),
    o => o.init,
    o => (o.type === 'CallExpression' ? o : false),
    o => o.callee
  ],
  importFilename: 'react.developmnet.mjs',
  importSelectSteps: [
    o => o.body,
    o => o.type === 'ImportDeclaration' ? o : false,
    o => o.source
  ]
};
