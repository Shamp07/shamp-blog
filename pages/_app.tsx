import React from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import App from 'next/app';
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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default CustomApp;
