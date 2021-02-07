import React from 'react';
import { observer } from 'mobx-react-lite';
import CommentNormalMenu from './CommentNormalMenu';
import CommentModifyMenu from './CommentModifyMenu';
import useStores from '../../../../stores/useStores';

interface CommentRowInterface {
  id: number,
  commentId: number,
  userId: number,
  userName: string,
  commentUserName: string,
  content: string,
  time: string,
  isTag: boolean,
}

const CommentMenu = ({ data }: { data: CommentRowInterface }) => {
  const { CommentStore } = useStores();
  const { modifierCommentId } = CommentStore;
  const { id } = data;

  return id === modifierCommentId
    ? <CommentModifyMenu /> : <CommentNormalMenu data={data} />;
};

export default observer(CommentMenu);
