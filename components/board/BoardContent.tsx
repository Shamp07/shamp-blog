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
  ), [isMoreThanOne, postList]);

  return (
    <Wrapper>
      {posts}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
  border-radius: 14px;
  background-color: #fff;
  overflow: hidden;

  @media (max-width: 1064px) {
    border-radius: 0;
  }
`;

export default BoardContent;
