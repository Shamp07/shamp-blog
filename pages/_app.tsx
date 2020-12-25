import React from 'react';
import { Provider } from 'mobx-react';
import Head from 'next/head';
import stores from '../stores';
import Layout from '../components/layout';

const MyApp = ({ Component, pageProps }: any) => (
  <Provider {...stores}>
    <Head>
      <title>Shamp Blog</title>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
