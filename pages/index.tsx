import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { Provider } from 'mobx-react';
import Header from '../components/layout/Header';
import stores from '../stores';

const Index: React.FC = () => (
  <Provider
    TestStore={stores.TestStore}
  >
    <GlobalStyle />
    <Header />
    <Link href="/test">
      test
    </Link>
  </Provider>
);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export default Index;
