import React from 'react';
import App, { AppContext } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

import stores from '@stores';
import Layout from '@components/Layout';
import * as T from '@types';

const queryClient = new QueryClient();

class CustomApp extends App {
  static async getInitialProps(context: AppContext) {
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
  }

  constructor(props: T.MyAppProps) {
    super(props);
    if (typeof window !== 'undefined') {
      stores(props.initialMobxState);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Shamp Blog</title>
          <meta
            name="viewport"
            content="user-scalable=no, width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="저의 개발스토리와 일상을 공유하는 블로그입니다." />
          <meta property="og:title" content="Shamp Blog" />
          <meta
            property="og:image"
            content="https://ko.gravatar.com/userimage/201440531/c7eb1d92694dfbcf00f7a79ea61811bf.png?size=512"
          />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:site_name" content="Shamp Blog" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          />
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          />
        </Head>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </>
    );
  }
}

export default CustomApp;
