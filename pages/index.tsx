import React from 'react';

import stores from '@stores';
import Home from '@components/Home';

const Page = () => <Home />;

Page.getInitialProps = async () => {
  const { homeStore } = stores();

  await Promise.all([
    homeStore.getRecentPosts(),
    homeStore.getNoticePosts(),
    homeStore.getFootprint(),
  ]);

  return {
    props: {},
  };
};

export default Page;
