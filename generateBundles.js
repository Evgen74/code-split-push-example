const AdmZip = require('adm-zip');
const args = require('yargs').argv;
const { execSync } = require('child_process');
const fs = require('fs');

const DIST_DIR = './dist';
const MAP_FILE = 'fileToIdMap.txt';
const HERMES_PATH_OSX = './node_modules/react-native/sdks/hermesc/osx-bin/hermesc';

const metroConfigMap = {
  INITIAL: 'metro.config.js',
  BUNDLE: 'metro.bundle.config.js',
};

let platform = 'ios';
let dev = false;
let withHermes = false;
let minifyParams = true;

const bundlesForBuild = [];
const defaultDepsExists = [];

const extractNameFromPackageName = packageName =>
  packageName.includes('@code-push') ? packageName.split('/')[1] : packageName;

fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(`${DIST_DIR}/bundles`, { recursive: true });

const generateCommand = ({ name, metroConfig, modulePath, simpleName, isRepeat }) => {
  const bundleOutput = `${DIST_DIR}/${name}/${name}.${platform}.bundle`;
  let command = `export MODULE_PATH="${simpleName}" && npx react-native bundle --platform ${platform} --config ${metroConfig} --minify ${minifyParams} --dev ${dev} --entry-file ${modulePath} --bundle-output ${bundleOutput} --assets-dest=${DIST_DIR}/${name} --reset-cache`;
  if (isRepeat) {
    command = `export IS_REPEAT="true" && ${command}`;
  }
  return command;
};

const prepareBundles = () => {
  const folders = fs.readdirSync('./bundles');
  folders.forEach(name => {
    if (name !== 'home') {
      const pkgPath = `./bundles/${name}/package.json`;
      if (fs.existsSync(pkgPath)) {
        bundlesForBuild.push(name);
      }
    }
  });
};

const generateMetaByModule = (type, name, isRequire = false) => {
  const pkgPath = `./bundles/${name}/package.json`;
  const { name: packageName, version, peerDependencies = {} } = JSON.parse(fs.readFileSync(pkgPath));
  const normalizedName = extractNameFromPackageName(packageName);

  const depsArray = Object.keys(peerDependencies)
    .filter(dep => {
      const bundleName = extractNameFromPackageName(dep);
      if (defaultDepsExists.includes(bundleName)) {return false;}
      if (isRequire) {defaultDepsExists.push(bundleName);}
      return bundlesForBuild.includes(bundleName);
    })
    .map(extractNameFromPackageName);

  const metaPath = `${DIST_DIR}/meta.json`;
  let meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath)) : {};
  meta[normalizedName] = { version, deps: depsArray };
  fs.writeFileSync(metaPath, JSON.stringify(meta));

  return { name: normalizedName, version, deps: depsArray };
};

const createZip = async (sourceDir, name) => {
  const zip = new AdmZip();
  zip.addLocalFolder(sourceDir, `${name}/`);
  await zip.writeZipPromise(`${DIST_DIR}/${name}.zip`);
};

const generateCommonHermesBundle = bundlePath => {
  const hermesBundle = `${bundlePath}.tmp`;
  const cmd = `${HERMES_PATH_OSX} ${bundlePath} -emit-binary -O -output-source-map -out ${hermesBundle}`;
  try {
    execSync(cmd, { stdio: 'ignore' });
  } catch (error) {
    console.error(error);
  }
  fs.copyFileSync(hermesBundle, bundlePath, fs.constants.COPYFILE_FICLONE);
  fs.rmSync(hermesBundle);
};

const buildBundle = async (name, modulePath, type, isRequire = false, beforeZipCallback = null, isRepeat = false) => {
  const metroConfig = metroConfigMap[type];
  const metaData = generateMetaByModule(type, name, isRequire);
  const outputDir = `${DIST_DIR}/${name}_${metaData.version}`;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const command = generateCommand({
    simpleName: name,
    name: `${name}_${metaData.version}`,
    modulePath,
    metroConfig,
    isRepeat,
  });

  console.log(command);

  execSync(command, { stdio: 'ignore' });

  const bundlePath = `${outputDir}/${name}_${metaData.version}.${platform}.bundle`;
  if (withHermes) {
    await generateCommonHermesBundle(bundlePath);
  }

  if (beforeZipCallback) {
    beforeZipCallback(outputDir);
  }
  await createZip(outputDir, `${name}_${metaData.version}`);
};

const generateInitialJsBundle = () => buildBundle('home', './index.js', 'INITIAL', true);

const resetFileIdToMap = () => {
  if (fs.existsSync(MAP_FILE)) {
    fs.rmSync(MAP_FILE);
  }
};

const generateBundles = async () => {
  for (const bundleName of bundlesForBuild) {
    await buildBundle(bundleName, `./bundles/${bundleName}/src/index.ts`, 'BUNDLE');
  }
};

const generateBundlesFolder = async () => {
  const dirs = fs.readdirSync(DIST_DIR).filter(f => fs.statSync(`${DIST_DIR}/${f}`).isDirectory());
  for (const dir of dirs) {
    if (dir !== 'bundles') {
      fs.renameSync(`${DIST_DIR}/${dir}`, `${DIST_DIR}/bundles/${dir}`);
    }
  }
  fs.cpSync(`${DIST_DIR}/bundles`, './android/app/src/main/assets/bundles', {recursive: true});
};

(async function main() {
  withHermes = args.hermes === 'true';
  if (typeof args.minify !== 'undefined') {
    minifyParams = args.minify;
  }
  if (args.platform) {
    platform = args.platform;
  }
  if (args.dev === 'true') {
    dev = true;
  }

  resetFileIdToMap();
  prepareBundles();
  await generateBundles();
  await generateInitialJsBundle();
  generateBundlesFolder();
})();
