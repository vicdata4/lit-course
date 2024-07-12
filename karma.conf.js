const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('webpack-merge');

module.exports = (config) => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        {
          pattern: config.grep ? config.grep : 'tests/*.test.js',
          type: 'module',
        },
        {
          pattern: config.grep ? config.grep : 'src/profiles/*/tests/*.test.js',
          type: 'module',
        },
      ],

      esm: {
        nodeResolve: true,
      },
      hostname: '127.0.0.1',
      coverageIstanbulReporter: {
        thresholds: {
          global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
          },
        },
      },
    }),
  );
  return config;
};
