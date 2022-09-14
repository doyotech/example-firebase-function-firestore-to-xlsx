module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['ConditionalExpression'],
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'max-len': ['error', { code: 160, ignoreComments: true, ignoreUrls: true }],
    'operator-linebreak': [
      'error',
      'before',
      { overrides: { '?': 'before', '=': 'after', '&&': 'after' } },
    ],
    'no-unused-vars': 'warn',
    'quote-props': ['error', 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
  },
};
