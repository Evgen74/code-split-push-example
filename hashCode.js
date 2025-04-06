const fs = require('fs');
const {exit} = require('process');
const {makeHashFunc} = require('./makeHashFunc');

const MAP_FILE = 'fileToIdMap.txt';
const assetMagicNumber = 3;

if (!fs.existsSync(MAP_FILE)) {
  fs.writeFileSync(MAP_FILE, '');
}

const fileToIdMap = {};
const ids = new Set();

fs.readFileSync(MAP_FILE)
  .toString()
  .split('\n')
  .forEach(content => {
    const [path, id, name] = content.split(':');
    fileToIdMap[path] = {id, isAdded: assetMagicNumber, name};
    ids.add(id);
  });

const appendToIdFile = (modulePath, id, isAutoAdded, name) => {
  if (!fileToIdMap[modulePath]) {
    if (ids.has(id)) {
      console.log('error!!!, rename your module with path - ', modulePath);
      exit(1);
    }

    fileToIdMap[modulePath] = {id, name, isAdded: isAutoAdded};
    ids.add(id);
    fs.appendFileSync(MAP_FILE, `${modulePath}:${id}:${name}\n`);
  }
};

// got from https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
const makeHash = (str, name, isAutoAdded = 0) => {
  const id = makeHashFunc(str);

  appendToIdFile(str, id, isAutoAdded, name);

  return id;
};

module.exports = {
  makeHash,
  fileToIdMap,
  ids,
  assetMagicNumber,
};
