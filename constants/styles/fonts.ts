import { css } from '@emotion/react';

export const enum FontFamily {
  ROBOTO = 'Roboto',
  NOTO_SANS_KR = 'Noto Sans KR',
  PT_SANS = 'PT Sans',
  JETBRAINS_MONO = 'JetBrains Mono',
  SERIF = 'serif',
}

export const fontStyles = css`
  @font-face {
    font-family: ${FontFamily.NOTO_SANS_KR};
    font-style: normal;
    font-weight: 100;
    src: url('fonts/noto-sans-kr-v25-korean-100.eot');
    src: local(''),
         url('fonts/noto-sans-kr-v25-korean-100.eot?#iefix') format('embedded-opentype'),
         url('fonts/noto-sans-kr-v25-korean-100.woff2') format('woff2'),
         url('fonts/noto-sans-kr-v25-korean-100.woff') format('woff'),
         url('fonts/noto-sans-kr-v25-korean-100.svg#NotoSansKR') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.NOTO_SANS_KR};
    font-style: normal;
    font-weight: 300;
    src: url('fonts/noto-sans-kr-v25-korean-300.eot');
    src: local(''),
         url('fonts/noto-sans-kr-v25-korean-300.eot?#iefix') format('embedded-opentype'),
         url('fonts/noto-sans-kr-v25-korean-300.woff2') format('woff2'),
         url('fonts/noto-sans-kr-v25-korean-300.woff') format('woff'),
         url('fonts/noto-sans-kr-v25-korean-300.svg#NotoSansKR') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.NOTO_SANS_KR};
    font-style: normal;
    font-weight: 400;
    src: url('fonts/noto-sans-kr-v25-korean-regular.eot');
    src: local(''),
         url('fonts/noto-sans-kr-v25-korean-regular.eot?#iefix') format('embedded-opentype'),
         url('fonts/noto-sans-kr-v25-korean-regular.woff2') format('woff2'),
         url('fonts/noto-sans-kr-v25-korean-regular.woff') format('woff'),
         url('fonts/noto-sans-kr-v25-korean-regular.svg#NotoSansKR') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.NOTO_SANS_KR};
    font-style: normal;
    font-weight: 500;
    src: url('fonts/noto-sans-kr-v25-korean-500.eot');
    src: local(''),
         url('fonts/noto-sans-kr-v25-korean-500.eot?#iefix') format('embedded-opentype'),
         url('fonts/noto-sans-kr-v25-korean-500.woff2') format('woff2'),
         url('fonts/noto-sans-kr-v25-korean-500.woff') format('woff'),
         url('fonts/noto-sans-kr-v25-korean-500.svg#NotoSansKR') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.NOTO_SANS_KR};
    font-style: normal;
    font-weight: 700;
    src: url('fonts/noto-sans-kr-v25-korean-700.eot');
    src: local(''),
         url('fonts/noto-sans-kr-v25-korean-700.eot?#iefix') format('embedded-opentype'),
         url('fonts/noto-sans-kr-v25-korean-700.woff2') format('woff2'),
         url('fonts/noto-sans-kr-v25-korean-700.woff') format('woff'),
         url('fonts/noto-sans-kr-v25-korean-700.svg#NotoSansKR') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.NOTO_SANS_KR};
    font-style: normal;
    font-weight: 900;
    src: url('fonts/noto-sans-kr-v25-korean-900.eot');
    src: local(''),
         url('fonts/noto-sans-kr-v25-korean-900.eot?#iefix') format('embedded-opentype'),
         url('fonts/noto-sans-kr-v25-korean-900.woff2') format('woff2'),
         url('fonts/noto-sans-kr-v25-korean-900.woff') format('woff'),
         url('fonts/noto-sans-kr-v25-korean-900.svg#NotoSansKR') format('svg');
  }

  @font-face {
    font-family: ${FontFamily.ROBOTO};
    font-style: normal;
    font-weight: 100;
    src: url('fonts/roboto-v29-latin-100.eot');
    src: local(''),
    url('fonts/roboto-v29-latin-100.eot?#iefix') format('embedded-opentype'),
    url('fonts/roboto-v29-latin-100.woff2') format('woff2'),
    url('fonts/roboto-v29-latin-100.woff') format('woff'),
    url('fonts/roboto-v29-latin-100.ttf') format('truetype'),
    url('fonts/roboto-v29-latin-100.svg#Roboto') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.ROBOTO};
    font-style: normal;
    font-weight: 300;
    src: url('fonts/roboto-v29-latin-300.eot');
    src: local(''),
    url('fonts/roboto-v29-latin-300.eot?#iefix') format('embedded-opentype'),
    url('fonts/roboto-v29-latin-300.woff2') format('woff2'),
    url('fonts/roboto-v29-latin-300.woff') format('woff'),
    url('fonts/roboto-v29-latin-300.ttf') format('truetype'),
    url('fonts/roboto-v29-latin-300.svg#Roboto') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.ROBOTO};
    font-style: normal;
    font-weight: 400;
    src: url('fonts/roboto-v29-latin-regular.eot');
    src: local(''),
    url('fonts/roboto-v29-latin-regular.eot?#iefix') format('embedded-opentype'),
    url('fonts/roboto-v29-latin-regular.woff2') format('woff2'),
    url('fonts/roboto-v29-latin-regular.woff') format('woff'),
    url('fonts/roboto-v29-latin-regular.ttf') format('truetype'),
    url('fonts/roboto-v29-latin-regular.svg#Roboto') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.ROBOTO};
    font-style: normal;
    font-weight: 500;
    src: url('fonts/roboto-v29-latin-500.eot');
    src: local(''),
    url('fonts/roboto-v29-latin-500.eot?#iefix') format('embedded-opentype'),
    url('fonts/roboto-v29-latin-500.woff2') format('woff2'),
    url('fonts/roboto-v29-latin-500.woff') format('woff'),
    url('fonts/roboto-v29-latin-500.ttf') format('truetype'),
    url('fonts/roboto-v29-latin-500.svg#Roboto') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.ROBOTO};
    font-style: normal;
    font-weight: 700;
    src: url('fonts/roboto-v29-latin-700.eot');
    src: local(''),
    url('fonts/roboto-v29-latin-700.eot?#iefix') format('embedded-opentype'),
    url('fonts/roboto-v29-latin-700.woff2') format('woff2'),
    url('fonts/roboto-v29-latin-700.woff') format('woff'),
    url('fonts/roboto-v29-latin-700.ttf') format('truetype'),
    url('fonts/roboto-v29-latin-700.svg#Roboto') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.ROBOTO};
    font-style: normal;
    font-weight: 900;
    src: url('fonts/roboto-v29-latin-900.eot');
    src: local(''),
    url('fonts/roboto-v29-latin-900.eot?#iefix') format('embedded-opentype'),
    url('fonts/roboto-v29-latin-900.woff2') format('woff2'),
    url('fonts/roboto-v29-latin-900.woff') format('woff'),
    url('fonts/roboto-v29-latin-900.ttf') format('truetype'),
    url('fonts/roboto-v29-latin-900.svg#Roboto') format('svg');
  }

  @font-face {
    font-family: ${FontFamily.PT_SANS};
    font-style: normal;
    font-weight: 700;
    src: url('fonts/pt-sans-v16-latin-700.eot');
    src: local(''),
    url('fonts/pt-sans-v16-latin-700.eot?#iefix') format('embedded-opentype'),
    url('fonts/pt-sans-v16-latin-700.woff2') format('woff2'),
    url('fonts/pt-sans-v16-latin-700.woff') format('woff'),
    url('fonts/pt-sans-v16-latin-700.ttf') format('truetype'),
    url('fonts/pt-sans-v16-latin-700.svg#PTSans') format('svg');
  }

  @font-face {
    font-family: ${FontFamily.JETBRAINS_MONO};
    font-style: normal;
    font-weight: 100;
    src: url('fonts/jetbrains-mono-v11-latin-100.eot');
    src: local(''),
    url('fonts/jetbrains-mono-v11-latin-100.eot?#iefix') format('embedded-opentype'),
    url('fonts/jetbrains-mono-v11-latin-100.woff2') format('woff2'),
    url('fonts/jetbrains-mono-v11-latin-100.woff') format('woff'),
    url('fonts/jetbrains-mono-v11-latin-100.ttf') format('truetype'),
    url('fonts/jetbrains-mono-v11-latin-100.svg#JetBrainsMono') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.JETBRAINS_MONO};
    font-style: normal;
    font-weight: 200;
    src: url('fonts/jetbrains-mono-v11-latin-200.eot');
    src: local(''),
    url('fonts/jetbrains-mono-v11-latin-200.eot?#iefix') format('embedded-opentype'),
    url('fonts/jetbrains-mono-v11-latin-200.woff2') format('woff2'),
    url('fonts/jetbrains-mono-v11-latin-200.woff') format('woff'),
    url('fonts/jetbrains-mono-v11-latin-200.ttf') format('truetype'),
    url('fonts/jetbrains-mono-v11-latin-200.svg#JetBrainsMono') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.JETBRAINS_MONO};
    font-style: normal;
    font-weight: 300;
    src: url('fonts/jetbrains-mono-v11-latin-300.eot');
    src: local(''),
    url('fonts/jetbrains-mono-v11-latin-300.eot?#iefix') format('embedded-opentype'),
    url('fonts/jetbrains-mono-v11-latin-300.woff2') format('woff2'),
    url('fonts/jetbrains-mono-v11-latin-300.woff') format('woff'),
    url('fonts/jetbrains-mono-v11-latin-300.ttf') format('truetype'),
    url('fonts/jetbrains-mono-v11-latin-300.svg#JetBrainsMono') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.JETBRAINS_MONO};
    font-style: normal;
    font-weight: 400;
    src: url('fonts/jetbrains-mono-v11-latin-regular.eot');
    src: local(''),
    url('fonts/jetbrains-mono-v11-latin-regular.eot?#iefix') format('embedded-opentype'),
    url('fonts/jetbrains-mono-v11-latin-regular.woff2') format('woff2'),
    url('fonts/jetbrains-mono-v11-latin-regular.woff') format('woff'),
    url('fonts/jetbrains-mono-v11-latin-regular.ttf') format('truetype'),
    url('fonts/jetbrains-mono-v11-latin-regular.svg#JetBrainsMono') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.JETBRAINS_MONO};
    font-style: normal;
    font-weight: 500;
    src: url('fonts/jetbrains-mono-v11-latin-500.eot');
    src: local(''),
    url('fonts/jetbrains-mono-v11-latin-500.eot?#iefix') format('embedded-opentype'),
    url('fonts/jetbrains-mono-v11-latin-500.woff2') format('woff2'),
    url('fonts/jetbrains-mono-v11-latin-500.woff') format('woff'),
    url('fonts/jetbrains-mono-v11-latin-500.ttf') format('truetype'),
    url('fonts/jetbrains-mono-v11-latin-500.svg#JetBrainsMono') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.JETBRAINS_MONO};
    font-style: normal;
    font-weight: 600;
    src: url('fonts/jetbrains-mono-v11-latin-600.eot');
    src: local(''),
    url('fonts/jetbrains-mono-v11-latin-600.eot?#iefix') format('embedded-opentype'),
    url('fonts/jetbrains-mono-v11-latin-600.woff2') format('woff2'),
    url('fonts/jetbrains-mono-v11-latin-600.woff') format('woff'),
    url('fonts/jetbrains-mono-v11-latin-600.ttf') format('truetype'),
    url('fonts/jetbrains-mono-v11-latin-600.svg#JetBrainsMono') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.JETBRAINS_MONO};
    font-style: normal;
    font-weight: 700;
    src: url('fonts/jetbrains-mono-v11-latin-700.eot');
    src: local(''),
    url('fonts/jetbrains-mono-v11-latin-700.eot?#iefix') format('embedded-opentype'),
    url('fonts/jetbrains-mono-v11-latin-700.woff2') format('woff2'),
    url('fonts/jetbrains-mono-v11-latin-700.woff') format('woff'),
    url('fonts/jetbrains-mono-v11-latin-700.ttf') format('truetype'),
    url('fonts/jetbrains-mono-v11-latin-700.svg#JetBrainsMono') format('svg');
  }
  @font-face {
    font-family: ${FontFamily.JETBRAINS_MONO};
    font-style: normal;
    font-weight: 800;
    src: url('fonts/jetbrains-mono-v11-latin-800.eot');
    src: local(''),
    url('fonts/jetbrains-mono-v11-latin-800.eot?#iefix') format('embedded-opentype'),
    url('fonts/jetbrains-mono-v11-latin-800.woff2') format('woff2'),
    url('fonts/jetbrains-mono-v11-latin-800.woff') format('woff'),
    url('fonts/jetbrains-mono-v11-latin-800.ttf') format('truetype'),
    url('fonts/jetbrains-mono-v11-latin-800.svg#JetBrainsMono') format('svg');
  }
`;
