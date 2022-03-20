import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import PostCard from '@components/Home/PostCard';
import { MediaQuery } from '@constants/styles';
import stores from '@stores';
import * as T from '@types';

const Home = () => {
  const { postStore } = stores();
  const { posts } = postStore;

  const postCards = posts.map((post) => (
    <PostCard key={post.id} post={post} />
  ));

  return (
    <Root>
      <Wrapper>
        <Inner>
          {postCards}
        </Inner>
      </Wrapper>
    </Root>
  );
};

const Root = styled.div({
  width: '1728px',
  margin: '3.5rem auto',

  [MediaQuery[T.Device.DESKTOP]]: {
    width: '1376px',
  },

  [MediaQuery[T.Device.LAPTOP]]: {
    width: '1024px',
  },

  [MediaQuery[T.Device.TABLET]]: {
    width: 'calc(100% - 2rem)',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});

const Wrapper = styled.div({
  flex: '1 1 0%',
});

const Inner = styled.div({
  display: 'flex',
  margin: '-1rem',
  flexWrap: 'wrap',

  [MediaQuery[T.Device.TABLET]]: {
    margin: 0,
  },
});

export default observer(Home);
