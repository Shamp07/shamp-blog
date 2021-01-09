import React from 'react';
import Head from 'next/head';
import { StoreProvider } from '../components/StoreProvider';
import Layout from '../components/Layout';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

React.useLayoutEffect = React.useEffect;

const MyApp : React.FC = ({ Component, pageProps }: any) => (
  <StoreProvider {...pageProps}>
    <Head>
      <title>Shamp Blog</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </StoreProvider>
);

export default MyApp;
