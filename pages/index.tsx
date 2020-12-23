import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/layout/Header';

const Index: React.FC = () => (
  <div>
    <GlobalStyle />
    <Header />
  </div>
);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export default Index;
