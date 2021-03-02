import React from 'react';
import { observer } from 'mobx-react-lite';
import CommentNormalMenu, { CommentDataProps } from './CommentNormalMenu';
import CommentModifyMenu from './CommentModifyMenu';
import useStores from '../../../../stores/useStores';
import { RootStore } from '../../../../stores';

const CommentMenu = ({ data }: CommentDataProps) => {
  const { CommentStore } = useStores() as RootStore;
  const { modifierCommentId } = CommentStore;
  const { id } = data;

  return id === modifierCommentId
    ? <CommentModifyMenu /> : <CommentNormalMenu data={data} />;
};

export default observer(CommentMenu);
