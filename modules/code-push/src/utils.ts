import RNFS from 'react-native-fs';

export async function moveRecursively(source: string, destination: string) {
  const items = await RNFS.readDir(source);
  await RNFS.mkdir(destination);

  for (const item of items) {
    if (item.isFile()) {
      const destinationFile = `${destination}/${item.name}`;
      const isAlreadyExist = await RNFS.exists(destinationFile);
      if (isAlreadyExist) {
        await RNFS.unlink(destinationFile);
      }

      await RNFS.moveFile(item.path, destinationFile);
    } else {
      const subDirectory = `${source}/${item.name}`;
      const subDestinationDirectory = `${destination}/${item.name}`;
      await moveRecursively(subDirectory, subDestinationDirectory);
    }
  }
}

export const filterDsStore = (file: RNFS.ReadDirItem) =>
  file.name !== '.DS_Store';

export const getDirContent = async (path: string) =>
  (await RNFS.readDir(path)).filter(filterDsStore);

export const getBundleName = (nameWithVersion: string) =>
  nameWithVersion.split('_')[0];
