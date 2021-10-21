import React, { ReactNode, useEffect } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';
import { MediaQuery } from '@styles';
import dsPalette from '@constants/ds-palette';
import Popup from '@components/Popup';
import NextNprogress from 'nextjs-progressbar';
import Header from './Header';
import SideBar from './Sidebar';
import Content from './Content';

interface Props {
  children: ReactNode;
}

const options = {
  showSpinner: false,
};

const Layout = ({ children }: Props) => {
  const { signStore, alertStore } = stores();
  const { userData } = signStore;

  useEffect(() => {
    signStore.cookieCheck();
  }, []);

  useEffect(() => {
    if (userData) alertStore.getAlerts();
  }, [userData]);

  return (
    <Root>
      <Global styles={GlobalStyle} />
      <Header />
      {/*<CenterContent>*/}
      {/*  <SideBar />*/}
      {/*  <Content>*/}
      {/*    {children}*/}
      {/*  </Content>*/}
      {/*</CenterContent>*/}
      <Popup />
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
  backgroundColor: dsPalette.themeBackground.toString(),
  minHeight: '100vh',
});

const CenterContent = styled.div({
  margin: '-80px auto 0 auto',
  maxWidth: '1044px',
  display: 'flex',

  '&:after': {
    content: '""',
    display: 'block',
    clear: 'both',
  },

  [MediaQuery[T.Device.LARGE]]: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    maxWidth: '100%',
    margin: 0,
  },
});

const GlobalStyle = css({
  'header, body, span, div, nav, ul, li, h1, h2, h3, h4, pre': {
    fontFamily: 'Roboto, Noto Sans KR, serif',
    margin: 0,
    padding: 0,
    outline: 0,
  },

  'span, div': {
    lineHeight: 1,
  },

  body: {
    WebkitFontSmoothing: 'antialiased',
    color: dsPalette.typePrimary.toString(),
    minWidth: '320px',
    minHeight: '100%',
    webkitOverflowScrolling: 'touch',
  },

  'a, span, div': {
    webkitTapHighlightColor: 'transparent',
  },

  '@font-face': {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 300,
    unicodeRange: 'U+0041-005A, U+0061-007A, U+0030-0039',
  },
});

export default Layout;
