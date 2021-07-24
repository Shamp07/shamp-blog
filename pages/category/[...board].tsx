import React from 'react';
import { useRouter } from 'next/router';

import * as T from '@types';
import BoardHead from '../../components/board/BoardHead';
import BoardContent from '../../components/board/BoardContent';
import useStores from '../../stores/useStores';
import BoardPagination from '../../components/board/BoardPagination';
import PostView from '../../components/PostView';

const Board = () => {
  const router = useRouter();
  if (!router.query.board) return null;

  const { AlertStore, SidebarStore } = useStores();
  const { toggleAlertModal } = AlertStore;
  const { boardCategoryName } = SidebarStore;

  if (!boardCategoryName[router.query.board[0]]) {
    router.push('/').then(() => toggleAlertModal('존재하지 않는 게시판입니다.'));
    return null;
  }

  if (router.query.board[1] === 'post') return <PostView />;

  return (
    <>
      <BoardHead />
      <BoardContent />
      <BoardPagination />
    </>
  );
};

Board.getInitialProps = async ({ query, store }: T.MyNextPageContext) => {
  if (!query.board || !store) return null;

  const board = query.board[0];
  const tag = query.board[1];
  if (tag === 'post') {
    const { PostStore, CommentStore } = store;
    const { getPost } = PostStore;
    const { getComment } = CommentStore;

    const id = Number(query.board[2]);

    await Promise.all([
      getPost(id, false),
      getComment(id),
    ]);
  } else {
    const { CategoryStore, PostStore } = store;
    const { getCategoryTags } = CategoryStore;
    const { getPostList } = PostStore;

    const page = Number(query.page ?? 1);

    await Promise.all([
      getPostList(board, tag, page),
      getCategoryTags(board),
    ]);
  }

  return {
    props: {},
  };
};

export default Board;
