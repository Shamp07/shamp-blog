import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import * as T from '@types';
import CommentNormalMenu from './CommentNormalMenu';
import CommentModifyMenu from './CommentModifyMenu';

export interface Props {
  data: T.Comment;
  setComment(value: T.Comment['content']): void;
  onModify(): void;
}

const CommentMenu = ({ data, setComment, onModify }: Props) => {
  const { commentStore } = stores();
  const { modifierCommentId } = commentStore;
  const { id } = data;

  if (id === modifierCommentId) return <CommentModifyMenu onModify={onModify} />;

  return <CommentNormalMenu data={data} setComment={setComment} />;
};

export default observer(CommentMenu);
