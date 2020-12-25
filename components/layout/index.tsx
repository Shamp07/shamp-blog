import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from './Header';

const Layout: React.FC = ({ children }: any) => (
  <>
    <GlobalStyle />
    <Header />
    {children}
  </>
);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export default Layout;
