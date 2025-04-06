async function loadBundleAsync(moduleId, path, options) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(require.importAll(moduleId));
    }, 2000);
  });
}

module.exports = loadBundleAsync;
