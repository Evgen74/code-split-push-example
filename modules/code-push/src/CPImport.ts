import {codePush} from './module';
import {BUNDLES_DIR, TEMP_DIR_TO_UNZIP, TEMP_HOST} from './constants';
import {meta} from './fetchMeta';
import RNFS, { downloadFile } from 'react-native-fs';
import {Platform} from 'react-native';
import { makeHashFunc } from '../../../makeHashFunc';

const generateNameBundle = (name: string, version: string) =>
  `${name}_${version}.${Platform.OS}.bundle`;

const generateFilePath = (name: string, version: string) =>
  `${BUNDLES_DIR}/${generateNameBundle(name, version)}`;

const dynamicRequire: (id: number) => any = require as any;
export async function CPImport(name: string) {
  const versionCurrent = meta?.[name]?.version || '';
  const deps = meta?.[name]?.deps || [];

  const norPath = `bundles/${name}/src/index.ts`;
  const filePath = generateFilePath(name, versionCurrent);
  const id = makeHashFunc(norPath);

  try {
    if (deps) {
      for (const el of deps) {
        await CPImport(el);
      }
    }

    const isExist = await RNFS.exists(filePath);
    if (!isExist) {

      const fullName = `${name}_${versionCurrent}`;
      const url = `${TEMP_HOST}/dist/${fullName}.zip`;
      await RNFS.mkdir(TEMP_DIR_TO_UNZIP);
      await downloadFile({
        fromUrl: url,
        toFile: `${TEMP_DIR_TO_UNZIP}/${fullName}.zip`,
      }).promise;

      await codePush.unpack();
    }

    await codePush.execute(filePath);

    return dynamicRequire(id);
  } catch (e: any) {
    console.log('e',e);
    throw e;
  }
}
