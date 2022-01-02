import React, { ReactNode, useEffect } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import NextNprogress from 'nextjs-progressbar';

import stores from '@stores';
import * as T from '@types';
import { FontFamily, MediaQuery } from '@constants/styles';
import dsPalette from '@constants/ds-palette';
import Popup from '@components/Popup';
import Header from './Header';

interface Props {
  children: ReactNode;
}

const options = {
  showSpinner: false,
};

const Layout = ({ children }: Props) => {
  const { signStore } = stores();

  useEffect(() => {
    signStore.authCheck();
  }, []);

  return (
    <Root>
      <Global styles={GlobalStyle} />
      <Popup />
      <Header />
      <CenterContent>
        {children}
      </CenterContent>
      <NextNprogress
        color={dsPalette.typeWhite.toString()}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={options}
      />
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: dsPalette.themeBackground.toString(),
  minHeight: '100vh',
});

const CenterContent = styled.div({
  display: 'flex',
  height: 'inherit',
  justifyContent: 'center',

  [MediaQuery[T.Device.TABLET]]: {
    width: 'calc(100% - 2rem)',
    margin: 'auto 1rem',
  },
});

const GlobalStyle = css({
  'header, body, span, div, nav, ul, li, h1, h2, h3, h4, pre': {
    fontFamily: `${FontFamily.ROBOTO}, ${FontFamily.NOTO_SANS_KR}, ${FontFamily.SERIF}`,
    margin: 0,
    padding: 0,
    outline: 0,
  },

  body: {
    WebkitFontSmoothing: 'antialiased',
    color: dsPalette.typePrimary.toString(),
    minWidth: '157px',
    minHeight: '100%',
    webkitOverflowScrolling: 'touch',
  },

  'a, span, div': {
    webkitTapHighlightColor: 'transparent',
  },

});

export default Layout;
