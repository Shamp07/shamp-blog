import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
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
  ), [isMoreThanOne]);

  return (
    <Wrapper>
      {posts}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
  border-radius: 14px;
  
  & > article:first-of-type {
    border-top-right-radius: 14px;
    border-top-left-radius: 14px;
  }

  & > article:last-child {
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
  }
`;

export default BoardContent;
