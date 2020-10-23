module.exports = {
  'extends': ['standard', 'prettier'],
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
    'es6': true,
    'mocha': true
  },
  'plugins': ['prettier'],
  'rules': {
    'space-before-function-paren': ['error', 'ignore'],
    'max-len': 'off',
    'no-console': 'error',
    'no-alert': 'error',
    'no-debugger': 'error',
    'object-curly-spacing': [1, 'always'],
    'lines-between-class-members': ['error', 'always'],
    'semi': [2, 'always'],
    'space-before-function-paren': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    'no-unused-expressions': 'off',
    'prettier/prettier': ['error']
  },
};