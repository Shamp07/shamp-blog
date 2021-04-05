import React, { ReactNode, useEffect } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import Header from './Header';
import SideBar from './Sidebar';
import Content from './Content';
import Backdrop from './Sidebar/Backdrop';
import useStores from '../../stores/useStores';
import { RootStore } from '../../stores';
import Chat from './Chat';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { SignStore, AlertStore } = useStores() as RootStore;
  const { cookieCheck } = SignStore;
  const { getAlertList } = AlertStore;
  useEffect(() => {
    cookieCheck();
    getAlertList();
  }, [cookieCheck, getAlertList]);

  return (
    <Wrapper>
      <Global styles={GlobalStyle} />
      <Header />
      <Backdrop />
      <CenterContent>
        <SideBar />
        <Content>
          {children}
        </Content>
      </CenterContent>
      <Chat />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #ebeef1;
  min-height: 100vh;
`;

const CenterContent = styled.div`
  margin: -200px auto 0 auto;
  max-width: 1044px;
  display: flex;

  &:after {
    content: "";
    display: block;
    clear: both;
  }

  @media (max-width: 1064px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-top: 0;
  }
`;

const GlobalStyle = css`
  html {
    line-height: 1.15;
  }

  header, body, span, div, nav, ul, li, h1, h2, h3, h4, pre {
    font-family: 'Roboto', 'Noto Sans KR', serif;
    margin: 0;
    padding: 0;
    outline: 0;
  }

  body {
    min-width: 320px;
    min-height: 100%;
    -webkit-overflow-scrolling: touch;
  }

  a, span, div {
    -webkit-tap-highlight-color: transparent;
  }

  .MuiButton-outlinedPrimary {
    color: #2d79c7 !important;
    border: 1px solid rgba(45, 121, 199, 0.5) !important;
  }

  .MuiButton-outlined.Mui-disabled  {
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
  }

  .MuiButton-root.Mui-disabled {
    color: rgba(0, 0, 0, 0.26) !important;
  }

  .MuiPaginationItem-textPrimary.Mui-selected,
  .MuiButton-containedPrimary {
    background-color: #2d79c7 !important;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }
`;

export default Layout;
