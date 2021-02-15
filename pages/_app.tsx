import React from 'react';
import Head from 'next/head';
import { observer, Provider } from 'mobx-react';
import App from 'next/app';
import 'highlight.js/styles/atom-one-dark.css';
import Layout from '../components/Layout';
import 'react-quill/dist/quill.snow.css';
import initializeStore from '../stores';

React.useLayoutEffect = React.useEffect;

@observer
class CustomApp extends App {
  mobxStore: any;

  static async getInitialProps(context: any) {
    const mobxStore = initializeStore();
    context.ctx.store = mobxStore;
    const appProps = await App.getInitialProps(context);

    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider {...this.mobxStore}>
        <Head>
          <title>Shamp Blog</title>
          <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
          <meta name="description" content="저의 개발스토리와 일상을 공유하는 블로그입니다." />
          <meta property="og:title" content="Shamp Blog" />
          <meta property="og:image" content="https://ko.gravatar.com/userimage/201440531/c7eb1d92694dfbcf00f7a79ea61811bf.png?size=512" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:site_name" content="Shamp Blog" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default CustomApp;
