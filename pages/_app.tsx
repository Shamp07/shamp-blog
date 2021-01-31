import React from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import App from 'next/app';
import 'highlight.js/styles/atom-one-dark.css';
import Layout from '../components/Layout';
import 'react-quill/dist/quill.snow.css';
import initializeStore from '../stores';

React.useLayoutEffect = React.useEffect;

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
    const { SignStore } = this.mobxStore;
    const { cookieCheck } = SignStore;
    cookieCheck();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider {...this.mobxStore}>
        <Head>
          <title>Shamp Blog</title>
          <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
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
