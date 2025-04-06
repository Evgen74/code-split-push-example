import {ARCHIVE_EXT, BUNDLES_DIR, TEMP_DIR_TO_UNZIP} from './constants';
import {getBundleName, getDirContent, moveRecursively} from './utils';
import {unzip} from 'react-native-zip-archive';
import RNFS, {mkdir} from 'react-native-fs';
import {NativeModules} from 'react-native';
import type {ICodePushModule} from './types';

export const {CodePush} = NativeModules as {
  CodePush: ICodePushModule;
};

function makeCodePush() {
  const unpack = async (): Promise<void> => {
    await unzipBundles();
    await prepareTempDir();
    await prepareDestinationDir();
    await mergeBundles();

    deleteTempDir();
  };

  const unzipBundles = async (): Promise<void> => {
    const folderContent = await RNFS.readDir(TEMP_DIR_TO_UNZIP);
    const bundlesPaths = folderContent
      .filter(file => file.name.includes(ARCHIVE_EXT))
      .map(file => file.path);

    const unzipPromises = bundlesPaths.map(path =>
      unzip(path, TEMP_DIR_TO_UNZIP),
    );

    await Promise.all(unzipPromises);
    await deleteItems(bundlesPaths);
  };

  const prepareTempDir = async (): Promise<void> => {
    //список распакованных папок с модулями
    const modulesDirs = await getDirContent(TEMP_DIR_TO_UNZIP);
    for (const moduleDir of modulesDirs) {
      //содержимое модуля
      const currentModuleContent = await getDirContent(moduleDir.path);
      for (const moduleDirItem of currentModuleContent) {
        if (moduleDirItem.isDirectory()) {
          await moveRecursively(
            moduleDirItem.path,
            `${TEMP_DIR_TO_UNZIP}/${moduleDirItem.name}`,
          );
        } else {
          const destinationFile = `${TEMP_DIR_TO_UNZIP}/${moduleDirItem.name}`;
          await RNFS.moveFile(moduleDirItem.path, destinationFile);
        }
      }
    }

    //удаляем папки с бандлами
    const dirsToDelete = modulesDirs.map(dir => dir.path);
    await deleteItems(dirsToDelete);
  };

  /**
   * удаляет существующие более старые версии бандлов.
   * формат бандла: bundleName_version.bundle
   */
  const prepareDestinationDir = async (): Promise<void> => {
    const isDestinationDirExist = await RNFS.exists(BUNDLES_DIR);
    if (!isDestinationDirExist) {
      return;
    }

    const newBundlesNames = (await getDirContent(TEMP_DIR_TO_UNZIP))
      .filter(item => item.name.includes('.bundle'))
      .map(item => getBundleName(item.name));

    const currentBundles = await getDirContent(BUNDLES_DIR);
    const bundlesToDelete = currentBundles
      .filter(bundle => {
        const bundleName = getBundleName(bundle.name);

        return newBundlesNames.includes(bundleName);
      })
      .map(bundle => bundle.path);

    await deleteItems(bundlesToDelete);
  };

  const mergeBundles = async (): Promise<void> => {
    await mkdir(BUNDLES_DIR);
    await moveRecursively(TEMP_DIR_TO_UNZIP, BUNDLES_DIR);
  };

  const deleteTempDir = async (): Promise<void> => {
    await deleteItems([TEMP_DIR_TO_UNZIP]);
  };

  const deleteItems = async (paths: string[]) => {
    const unlinkPromises: Promise<void>[] = paths.map(path =>
      RNFS.unlink(path),
    );

    await Promise.all(unlinkPromises);
  };

  return {
    unpack,
    execute: CodePush.execute,
  };
}

export const codePush = makeCodePush();
