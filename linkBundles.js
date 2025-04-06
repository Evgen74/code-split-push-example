const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs').promises;
const fsold = require('fs');

const bundlesPaths = ['./bundles', './modules'];
const nodeModulesPath = './node_modules';

const isDebug = true;

const processBundleDir = async (bundlesPath) => {
  const bundlesFolder = await fs.readdir(bundlesPath);
  return Promise.all(
    bundlesFolder
      .filter((packageFolder) => {
        if (packageFolder === '.DS_Store') {
          return false;
        }

        const dest = path.resolve(bundlesPath, packageFolder, './package.json');

        if (!fsold.existsSync(dest)) {

          console.log(`\x1b[31m ${dest} does not exist \x1b[0m`);

          return false;
        }

        return true;
      })
      .map(async (packageFolder) => {
        const logAccumulate = createLogAccumulate();
        const packageJsonPath = path.resolve(
          bundlesPath,
          packageFolder,
          './package.json',
        );

        let packageName = '';
        try {
          packageName = require(packageJsonPath).name;
        } catch {
          logAccumulate.log(`${packageJsonPath} can't find package.json`);
          logAccumulate.execute();

          return;
        }

        if (isDebug) {
          logAccumulate.log(`------start info about ${packageName}`);
        }

        if (isDebug) {
          try {
            const {stdout, stderr} = await exec(
              `ls -la ${path.resolve(nodeModulesPath, packageName)}`,
            );

            if (stderr) {
              logAccumulate.log(`debug:before-link-stderr: ${stderr}`);
            } else {
              logAccumulate.log(`debug:before-link-stdout: ${stdout}`);
            }
          } catch (error) {
            logAccumulate.log(`debug:before-link-error: ${error.message}`);
          }
        }

        await fs.mkdir(path.resolve(nodeModulesPath, packageName, '../'), {
          recursive: true,
        });

        await Promise.allSettled([
          fs
            .rm(path.resolve(nodeModulesPath, packageName), {
              recursive: true,
            })
            .catch((error) => {
              if (isDebug) {
                logAccumulate.log('debug:rm-error: ', error.message);
              }
            }),
          fs
            .unlink(path.resolve(nodeModulesPath, packageName), {
              recursive: true,
            })
            .catch((error) => {
              if (isDebug) {
                logAccumulate.log('debug:unlink-error: ', error.message);
              }
            }),
        ]);

        try {
          await fs.symlink(
            path.relative(
              path.join(nodeModulesPath, packageName, '../'),
              path.join(bundlesPath, packageFolder),
            ),
            path.resolve(nodeModulesPath, packageName),
          );

          logAccumulate.log(`create symlink for ${packageName}`);

          if (isDebug) {
            try {
              const {stdout, stderr} = await exec(
                `ls -la ${path.resolve(nodeModulesPath, packageName)}`,
              );

              if (stderr) {
                logAccumulate.log(`debug:after-link-stderr: ${stderr}`);
              } else {
                logAccumulate.log(`debug:after-link-stdout: ${stdout}`);
              }
            } catch (error) {
              logAccumulate.log(`debug:after-link-error: ${error.message}`);
            }
          }
        } catch (error) {
          if (error.syscall === 'symlink' && error.code === 'EEXIST') {
            logAccumulate.log(`already exist symlink for ${packageName}`);
          } else {
            logAccumulate.log(error);
          }
        }

        if (isDebug) {
          logAccumulate.log(`------end info about ${packageName}`);
        }

        logAccumulate.execute();
      }),
  );
};

const createLogAccumulate = () => {
  const output = [];

  return {
    log: (...args) => {
      output.push(args.join(''));
    },
    execute: () =>

      console.log(
        output.reduce(
          (acc, str, index) =>
            acc +
            (str[str.length - 1] === '\n' || index === output.length - 1
              ? str
              : `${str}\n`),
          '',
        ),
      ),
  };
};

(async () => {
  for (const bundlesDir of bundlesPaths) {
    await processBundleDir(bundlesDir);
  }
})();
