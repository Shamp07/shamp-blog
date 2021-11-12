import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import stores from '@stores';
import { MediaQuery } from '@constants/styles';
import * as T from '@types';
import Post from './Post';
import PostNone from './PostNone';

const Content = () => {
  const { postStore } = stores();
  const { posts } = postStore;

  const isMoreThanOne = posts.length >= 1;

  const postList = useMemo(() => (
    isMoreThanOne ? posts.map((data) => (
      <Post data={data} key={data.id} />
    )) : <PostNone />
  ), [isMoreThanOne, posts]);

  return (
    <Root>
      {postList}
    </Root>
  );
};

const Root = styled.section({
  backgroundColor: '#fff',
  borderRadius: '14px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  overflow: 'hidden',

  [MediaQuery[T.Device.TABLET]]: {
    borderRadius: 0,
  },
});

export default Content;
