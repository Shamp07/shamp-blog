import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from '@material-ui/core';
import Header from './Header';
import SideBar from './Sidebar';
import Content from './Content';

const Layout: React.FC = ({ children }: any) => (
  <Wrapper>
    <GlobalStyle />
    <Header />
    <CenterContent maxWidth="lg">
      <SideBar />
      <Content />
    </CenterContent>
    {/* {children} */}
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #ebeef1;
  min-height: 100vh;
`;

const CenterContent = styled(Container)`
  margin-top: -200px;
  height: 100vh;
  position: relative;
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
