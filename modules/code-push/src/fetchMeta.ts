import { TEMP_HOST } from './constants';
import { Meta } from './types';

export let meta: Meta = {};

export const fetchMeta = async () => {
  const response = await fetch(`${TEMP_HOST}/dist/meta.json`);
  const data = await response.json();

  meta = data;

  return meta;
};
