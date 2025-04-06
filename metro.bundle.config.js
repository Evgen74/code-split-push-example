const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {makeHash} = require('./hashCode.js');
const {makeHashFunc} = require('./makeHashFunc.js');
const blackList = require('./ignorePaths.json');

function getParsedModulePath(str) {
  return str.replace(`${__dirname}/`, '');
}

const config = {
  resolver: {
    enableGlobalPackages: false,
  },
  transformer: {
    asyncRequireModulePath: require.resolve('./customBundleLoader.js'),

    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  serializer: {
    createModuleIdFactory: function () {
      return function (pathModule) {
        const modulePath = getParsedModulePath(pathModule);

        if (
          process.env?.MODULE_PATH &&
          modulePath.includes(`/${process.env.MODULE_PATH}/`)
        ) {
          return makeHash(modulePath, process.env.MODULE_PATH);
        }

        return makeHashFunc(modulePath);
      };
    },
    processModuleFilter: function (modules) {
      if (!modules.path.includes(__dirname)) {
        return false;
      }

      const modulePath = getParsedModulePath(modules.path);

      if (
        process.env?.MODULE_PATH &&
        modulePath.includes(`/${process.env.MODULE_PATH}/`)
      ) {
        return true;
      }

      if (blackList.includes(modulePath)) {
        return false;
      }

      return false;
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
