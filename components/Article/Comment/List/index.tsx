import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';
import More from './More';
import Row from './Row';
import None from './None';

interface Props {
  modifyId: T.Comment['id'];
  replyId: T.Comment['id'];
  size: number;
  setModifyId(id: T.Comment['id']): void;
  setReplyId(id: T.Comment['id']): void;
  increaseSize(): void;
}

const List = ({
  modifyId, replyId, size, setModifyId, setReplyId,
  increaseSize,
}: Props) => {
  const { commentStore } = stores();
  const { comments } = commentStore;

  const isMoreComment = comments[0]?.total > size;

  const list = useMemo(() => (
    comments.length ? comments.map((data) => (
      <Row
        key={data.id}
        data={data}
        replyId={replyId}
        modifyId={modifyId}
        size={size}
        setModifyId={setModifyId}
        setReplyId={setReplyId}
      />
    )) : <None />),
  [comments, replyId, modifyId]);

  return (
    <Root>
      <ul>
        {list}
        {isMoreComment && <More increaseSize={increaseSize} />}
      </ul>
    </Root>
  );
};

const Root = styled.div`
  & > ul {
    list-style: none;
  }
`;

export default observer(List);
