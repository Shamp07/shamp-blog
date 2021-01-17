import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import CommentRow, { CommentRowInterface } from './CommentRow';

const CommentList: React.FC = () => {
  const { CommentStore } = useStores();
  const { commentList } = CommentStore;

  return (
    <CommentListWrapper>
      <ul>
        {commentList.map(
          (data: CommentRowInterface) => <CommentRow data={data} key={data.id} />,
        )}
      </ul>
    </CommentListWrapper>
  );
};

const CommentListWrapper = styled.div`
  & > ul {
    list-style: none;
  }
`;

export default observer(CommentList);
