import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import BoardHead from '../../components/board/BoardHead';
import BoardContent from '../../components/board/BoardContent';
import useStores from '../../stores/useStores';
import BoardPagination from '../../components/board/BoardPagination';

const Board: NextPage = () => {
  const router = useRouter();
  const { AlertStore, SidebarStore } = useStores();
  const { toggleAlertModal } = AlertStore;
  const { boardCategoryName } = SidebarStore;
  const boardParams = router.query.board as Array<string>;
  if (!boardParams) {
    return (<></>);
  }

  const boardPath = boardParams[0] as string;

  if (!boardCategoryName[boardPath]) {
    router.push('/').then(() => {
      toggleAlertModal('존재하지 않는 게시판입니다.');
    });
    return (<></>);
  }

  return (
    <div>
      <BoardHead />
      <BoardContent />
      <BoardPagination />
    </div>
  );
};

Board.getInitialProps = async ({ query, store }: any) => {
  const { CategoryStore, PostStore } = store;
  const { getCategoryTags } = CategoryStore;
  const { getPostList } = PostStore;
  const categoryParams = query.board as Array<string>;
  const category = categoryParams[0] as string;
  const tag = categoryParams[1] as string;
  const { page } = query;

  await Promise.all([getPostList(category, tag, page), getCategoryTags(category)]);

  return {
    props: {},
  };
};

export default Board;
