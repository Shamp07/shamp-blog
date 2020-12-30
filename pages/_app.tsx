import React from 'react';
import { Provider } from 'mobx-react';
import Head from 'next/head';
import stores from '../stores';
import Layout from '../components/Layout';

React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, pageProps }: any) => (
  <Provider {...stores}>
    <Head>
      <title>Shamp Blog</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
