const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {makeHash} = require('./hashCode.js');
const path = require('path');
const fs = require('fs');

const bundlesDir = path.resolve(__dirname, 'bundles');
const watchFolders = fs
  .readdirSync(bundlesDir)
  .map((dir) => path.resolve(bundlesDir, dir))
  .filter((dir) => fs.statSync(dir).isDirectory());

function getParsedModulePath(str) {
  return str.replace(`${__dirname}/`, '');
}

const config = {
  watchFolders,
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: false,
      },
    }),
  },
  serializer: {
    createModuleIdFactory: function () {
      return function (pathModule) {
        const modulePath = getParsedModulePath(pathModule);

        return makeHash(modulePath, process.env?.MODULE_PATH || 'DEV', true);
      };
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
