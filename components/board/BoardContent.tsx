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
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  
  & > article:first-child {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  & > article:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export default BoardContent;