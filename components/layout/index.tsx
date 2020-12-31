import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import SideBar from './Sidebar';
import Content from './Content';
import Backdrop from './Sidebar/Backdrop';

const Layout: React.FC = ({ children }: any) => (
  <Wrapper>
    <GlobalStyle />
    <Header />
    <Backdrop />
    <CenterContent>
      <SideBar />
      <Content>
        {children}
      </Content>
    </CenterContent>
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #ebeef1;
  min-height: 100vh;
`;

const CenterContent = styled.div`
  margin: -200px auto 0 auto;
  height: 100vh;
  position: relative;
  max-width: 1044px;
  
  @media (max-width: 1064px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-top: 10px;
  }
`;

const GlobalStyle = createGlobalStyle`
  header, body, div, nav, ul, li, h1 {
    font-family: 'Roboto', 'Noto Sans KR', serif;
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    unicode-range:U+0041-005A, U+0061-007A, U+0030-0039;
  }
`;

export default Layout;
