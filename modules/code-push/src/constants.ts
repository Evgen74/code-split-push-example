import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export const BUNDLES_DIR = `${RNFS.DocumentDirectoryPath}/bundles`;
export const TEMP_DIR_TO_UNZIP = `${RNFS.DocumentDirectoryPath}/temp/bundles`;
export const ARCHIVE_EXT = '.zip';

export const TEMP_HOST = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
