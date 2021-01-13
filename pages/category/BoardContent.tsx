import React from 'react';
import styled from 'styled-components';
import useStores from '../../stores/useStores';
import BoardPost, { BoardPostProps } from './BoardPost';

const BoardContent: React.FC = () => {
  const { PostStore } = useStores();
  const { postList } = PostStore;

  return (
    <ArticleWrapper>
      {postList.map(
        (data: BoardPostProps) => (
          <BoardPost data={data} key={data.id} />
        ),
      )}
    </ArticleWrapper>
  );
};

const ArticleWrapper = styled.section`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`;

export default BoardContent;
