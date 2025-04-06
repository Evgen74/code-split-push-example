module.exports = function(babel) {
  if (process.env.BABEL_ENV !== 'development') {
    return { visitor: {} };
  }
  const { types: t } = babel;
  return {
    name: 'code-push-babel-plugin',
    visitor: {
      Program: {
        enter(path, state) {
          state.moduleNames = {};
        },
        exit(path, state) {
          Object.keys(state.moduleNames).forEach(moduleName => {
            const importIdentifier = t.identifier(moduleName);
            const importDeclaration = t.importDeclaration(
              [t.importNamespaceSpecifier(importIdentifier)],
              t.stringLiteral(`@code-push/${moduleName}`)
            );
            path.unshiftContainer('body', importDeclaration);
          });
        },
      },
      ImportDeclaration(path) {
        if (
          path.node.source.value === '@code-push/code-push' &&
          path.node.specifiers.some(spec => t.isImportSpecifier(spec) && spec.imported.name === 'CPImport')
        ) {
          path.remove();
        }
      },
      CallExpression(path, state) {
        if (
          t.isIdentifier(path.node.callee, { name: 'CPImport' }) &&
          path.node.arguments.length === 1 &&
          t.isStringLiteral(path.node.arguments[0])
        ) {
          const moduleName = path.node.arguments[0].value;
          state.moduleNames[moduleName] = true;
          if (path.parent && t.isAwaitExpression(path.parent)) {
            path.parentPath.replaceWith(t.identifier(moduleName));
          } else {
            path.replaceWith(t.identifier(moduleName));
          }
        }
      },
    },
  };
};
