/* eslint-disable no-console */
const { rollup } = require('rollup');
const { rollupConfig } = require('./utils/rollupConfig');

const { output, ...config } = rollupConfig({
  output: {
    entryFileNames: 'main.js'
  }
});

const consoleBackup = global.console;
global.console = {
  error: consoleBackup.error
};

rollup(config)
  .then((bundle) => bundle.write(output))
  .finally(() => {
    global.console = consoleBackup;
    console.log(`Build is ready! 🚀`);
  }).catch((error) => console.error(error));
