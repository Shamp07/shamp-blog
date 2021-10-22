import * as T from '@types';

export enum FontFamily {
  ROBOTO = 'Roboto',
  NOTO_SANS_KR = 'Noto Sans KR',
  PT_SANS = 'PT Sans',
  SERIF = 'serif'
}

export const DeviceWidth: {
  [K in T.Device]: number
} = {
  [T.Device.LARGE]: 1064,
};

export const MediaQuery: {
  [K in T.Device]: string;
} = {
  [T.Device.LARGE]: `@media(max-width: ${DeviceWidth[T.Device.LARGE]}px)`,
};
