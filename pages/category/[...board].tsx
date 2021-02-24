import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import BoardHead from '../../components/board/BoardHead';
import BoardContent from '../../components/board/BoardContent';
import useStores from '../../stores/useStores';
import BoardPagination from '../../components/board/BoardPagination';
import PostView from '../../components/PostView';
import { MyNextPageContext } from '../_app';

const Board: NextPage = () => {
  const router = useRouter();
  const { AlertStore, SidebarStore } = useStores();
  const { toggleAlertModal } = AlertStore;
  const { boardCategoryName } = SidebarStore;
  const boardParams = router.query.board as Array<string>;
  if (!boardParams) {
    return null;
  }

  const boardPath = boardParams[0] as string;

  if (!boardCategoryName[boardPath]) {
    router.push('/').then(() => {
      toggleAlertModal('존재하지 않는 게시판입니다.');
    });
    return null;
  }

  if (boardParams[1] && boardParams[1] === 'post') {
    return <PostView />;
  }

  return (
    <div>
      <BoardHead />
      <BoardContent />
      <BoardPagination />
    </div>
  );
};

Board.getInitialProps = async ({ query, store }: MyNextPageContext) => {
  const boardParams = query.board as Array<string>;
  const category = boardParams[0] as string;
  const tag = boardParams[1] as string;

  // 게시글 단일 조회 화면 (PostView)
  if (tag && tag === 'post' && store) {
    const { PostStore, CommentStore } = store;
    const { getPost } = PostStore;
    const { getComment } = CommentStore;

    const id = boardParams[2];
    await Promise.all([getPost(Number(id), false), getComment(Number(id))]);
  } else if (store) {
    const { CategoryStore, PostStore } = store;
    const { getCategoryTags } = CategoryStore;
    const { getPostList } = PostStore;
    const { page } = query;

    await Promise.all([getPostList(category, tag, Number(page)), getCategoryTags(category)]);
  }

  return {
    props: {},
  };
};

export default Board;
