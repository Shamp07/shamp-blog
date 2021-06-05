import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import BoardPost from './BoardPost';
import BoardPostNone from './BoardPostNone';

const BoardContent = () => {
  const { PostStore } = useStores();
  const { postList } = PostStore;

  const posts = useMemo(() => (
    postList.length ? postList.map((data) => (
      <BoardPost data={data} key={data.id} />
    )) : <BoardPostNone />
  ), [postList.length]);

  return (
    <Wrapper>
      {posts}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
  
  & > article:first-of-type {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  & > article:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export default BoardContent;
