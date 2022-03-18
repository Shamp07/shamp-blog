import React, { useEffect } from 'react';
import App, { AppContext } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import * as T from '@types';
import stores from '@stores';
import Layout from '@components/Layout';
import { pageView } from '@utilities/ga';

config.autoAddCss = false;

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps, initialMobxState }: T.MyAppProps) => {
  if (typeof window !== 'undefined') stores(initialMobxState);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Shamp Blog</title>
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1.0"
        />
        <meta property="title" content="Shamp Blog" key="title" />
        <meta property="og:title" content="Shamp Blog" key="og-title" />
        <meta name="description" content="저의 개발스토리와 일상을 공유하는 블로그입니다." key="description" />
        <meta name="og:description" content="저의 개발스토리와 일상을 공유하는 블로그입니다." key="og-description" />
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:locale" content="ko_KR" />
        <meta
          property="og:image"
          content="https://ko.gravatar.com/userimage/201440531/c7eb1d92694dfbcf00f7a79ea61811bf.png?size=512"
          key="og-image"
        />
        <meta property="og:site_name" content="Shamp Blog" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  if (typeof window === 'undefined') {
    axios.defaults.headers.Cookie = context.ctx.req?.headers.cookie ?? '';
  }

  const store = stores();
  await store.signStore.authCheck();

  const appProps = await App.getInitialProps(context);
  return {
    ...appProps,
    initialMobxState: store,
  };
};

export default MyApp;
