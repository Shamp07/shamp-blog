import React from 'react';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';

import PostCard from '@components/Home/PostCard';
import { MediaQuery } from '@constants/styles';
import * as T from '@types';

const Home = () => (
  <Root>
    <Wrapper>
      <Inner>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </Inner>
    </Wrapper>
  </Root>
);

const Root = styled.div({
  width: '1728px',
  margin: '0 auto',

  [MediaQuery[T.Device.DESKTOP]]: {
    width: '1376px',
  },

  [MediaQuery[T.Device.LAPTOP]]: {
    width: '1024px',
  },

  [MediaQuery[T.Device.TABLET]]: {
    width: 'calc(100% - 2rem)',
  },
});

const Wrapper = styled.div({
  flex: '1 1 0%',
});

const Inner = styled.div({
  display: 'flex',
  margin: '-1rem',
  flexWrap: 'wrap',
});

export default Home;
