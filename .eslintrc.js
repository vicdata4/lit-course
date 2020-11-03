module.exports = {
  'extends': ['standard', 'prettier', 'plugin:json/recommended'],
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
    'es6': true,
    'mocha': true
  },
  'plugins': ['prettier'],
  'rules': {
    'max-len': 'off',
    'no-console': 'error',
    'no-alert': 'error',
    'no-debugger': 'error',
    'object-curly-spacing': [1, 'always'],
    'lines-between-class-members': ['error', 'always'],
    'semi': [2, 'always'],
    'space-before-function-paren': 0,
    'quote-props': ['error', 'as-needed'],
    'no-unused-expressions': 'off',
    'prettier/prettier': ['error']
  },
};