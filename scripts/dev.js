/* eslint-disable no-console */
const { watch, rollup } = require('rollup');

const { folders, rollupConfig } = require('./utils/rollupConfig');

const ip = require('ip');
const chalk = require('chalk');
const serve = require('rollup-plugin-serve');
const liveReload = require('rollup-plugin-livereload');
const IP_ADDRESS = ip.address();
const CLEAR_OUTPUT = '\x1Bc';

const { output, ...config } = rollupConfig({
  output: {
    entryFileNames: 'main.js'
  },
  plugins: [
    serve({
      contentBase: folders.build,
      host: ['127.0.0.1'],
      port: 2900,
      historyApiFallback: true
    }),
    liveReload({
      watch: folders.build,
      delay: 500
    })
  ]
});

console.log(chalk`${CLEAR_OUTPUT}{black.bgMagenta Starting development serve...}`);

const consoleBackup = global.console;
global.console = {
  log() { },
  warn() { },
  error: consoleBackup.error
};

rollup(config)
  .then((bundle) => bundle.write(output))
  .then(() => watch({ ...config, output }))
  .finally(() => {
    global.console = consoleBackup;
    console.log(chalk`${CLEAR_OUTPUT}{green.bold We're up and running! 🚀}\n\n{blue Listening on} {black.bgBlue http://localhost:2900}\nAlso on your local network at {underline http://${IP_ADDRESS}:2900}\n`);
  }).catch((error) => console.error(error));
