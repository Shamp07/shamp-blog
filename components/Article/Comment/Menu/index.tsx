import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import * as T from '@types';
import CommentNormalMenu from './Menu';
import ModifyMenu from './ModifyMenu';

export interface Props {
  data: T.Comment;
  setComment(value: T.Comment['content']): void;
  onModify(): void;
}

const Menu = ({ data, setComment, onModify }: Props) => {
  const { commentStore } = stores();
  const { modifyId } = commentStore;
  const { id } = data;

  if (id === modifyId) return <ModifyMenu onModify={onModify} />;

  return <CommentNormalMenu data={data} setComment={setComment} />;
};

export default observer(Menu);
