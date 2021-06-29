import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import { MediaQuery } from '@styles';
import * as T from '@types';
import BoardPost from './BoardPost';
import BoardPostNone from './BoardPostNone';

const BoardContent = () => {
  const { PostStore } = useStores();
  const { postList } = PostStore;

  const isMoreThanOne = postList.length >= 1;

  const posts = useMemo(() => (
    isMoreThanOne ? postList.map((data) => (
      <BoardPost data={data} key={data.id} />
    )) : <BoardPostNone />
  ), [isMoreThanOne, postList]);

  return (
    <Wrapper>
      {posts}
    </Wrapper>
  );
};

const Wrapper = styled.section({
  backgroundColor: '#fff',
  borderRadius: '14px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  overflow: 'hidden',

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },
});

export default BoardContent;
