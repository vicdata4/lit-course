const { resolve: resolvePath, join: joinPath } = require('path');

const copy = require('rollup-plugin-copy');
const commonJS = require('rollup-plugin-commonJS');
const resolve = require('rollup-plugin-node-resolve');
const progress = require('rollup-plugin-progress');
const del = require('rollup-plugin-delete');

const folders = {
  build: resolvePath('.', 'build'),
  build_assets: resolvePath('.', 'build', 'assets'),
  src: resolvePath('.', 'src'),
  src_assets: resolvePath('.', 'assets')
};

const files = {
  main: joinPath(folders.src, 'index.js'),
  src_index: resolvePath('.', 'index.html'),
  src_manifest: resolvePath('.', 'manifest.json'),
  src_sw: resolvePath('.', 'sw.js'),
  build_index: joinPath(folders.build, 'index.html'),
  build_manifest: joinPath(folders.build, 'manifest.json'),
  build_sw: joinPath(folders.build, 'sw.js'),
};

const rollupConfig = ({
  input,
  output = {},
  plugins = [],
  config = {}
} = {}) => ({
  input: input || files.main,
  output: {
    dir: folders.build,
    sourcemap: true,
    format: 'esm',
    ...output
  },
  plugins: [
    del({
      targets: `${folders.build}`
    }),
    commonJS(),
    resolve(),
    progress(),
    copy({
      targets: {
        [folders.src_assets]: [folders.build_assets],
        [files.src_index]: [files.build_index],
        [files.src_manifest]: [files.build_manifest],
        [files.src_sw]: [files.build_sw]
      }
    }),
    ...plugins
  ],
  context: 'window',
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
  ...config
});

module.exports = {
  folders,
  files,
  rollupConfig
};
