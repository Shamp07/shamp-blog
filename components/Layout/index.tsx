import React, { ReactNode } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import NextNprogress from 'nextjs-progressbar';

import dsPalette from '@constants/ds-palette';
import Popup from '@components/Popup';
import Header from './Header';
import Content from './Content';

const options = {
  showSpinner: false,
};

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <Root>
    <Global styles={globalStyle} />
    <Popup />
    <Header />
    <Content>
      {children}
    </Content>
    <NextNprogress
      color={dsPalette.themePrimary.toString()}
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      options={options}
    />
  </Root>
);

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: dsPalette.themeBackground.toString(),
  minHeight: '100vh',
});

const globalStyle = css({
  'header, body, span, div, nav, ul, li, h1, h2, h3, h4, pre': {
    margin: 0,
    padding: 0,
    outline: 0,
  },

  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica Neue, Apple SD Gothic Neo, Malgun Gothic, 맑은 고딕, 나눔고딕, Nanum Gothic, Noto Sans KR, Noto Sans CJK KR, arial, 돋움, Dotum, Tahoma, Geneva, sans-serif',
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
