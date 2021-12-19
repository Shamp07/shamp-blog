import React from 'react';

import Home from '@components/Home';
import stores from '@stores';

const Page = () => <Home />;

Page.getInitialProps = async () => {
  const { postStore } = stores();

  await postStore.getPosts();

  return {
    props: {},
  };
};

export default Page;
