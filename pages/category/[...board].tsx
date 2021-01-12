import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import axios from 'axios';
import BoardHead from './BoardHead';
import BoardContent from './BoardContent';
import useStores from '../../stores/useStores';

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
    </div>
  );
};

// export async function getStaticPaths(context) {
//   console.log(context);
//   return {
//     paths: [
//       { params: { board: ['react'] } },
//     ],
//     fallback: false,
//   };
// }
//
// export async function getStaticProps({ params }) {
//   console.log(params);
//
//   return { props: {} };
// }

Board.getInitialProps = async ({ query, store }: any) => {
  console.log('getInitialProps');
  const { CategoryStore } = store;
  const { getCategoryTags } = CategoryStore;
  const categoryParams = query.board as Array<string>;
  const category = categoryParams[0] as string;
  // await getCategoryTags(category);

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Board;
