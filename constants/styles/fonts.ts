import { css } from '@emotion/react';

export const enum FontFamily {
  ROBOTO = 'Roboto',
  NOTO_SANS_KR = 'Noto Sans KR',
  PT_SANS = 'PT Sans',
  JETBRAINS_MONO = 'JetBrains Mono',
  SERIF = 'serif',
}

export const fontStyles = css({
  '@font-face': {
    fontFamily: FontFamily.NOTO_SANS_KR,
    fontStyle: 'normal',
    fontWeight: 400,
    src: "local(''), url('../../public/fonts/noto-sans-kr-v25-korean-regular.woff')",
  },
});
