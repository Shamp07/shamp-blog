import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import BoardHead from './BoardHead';
import BoardContent from './BoardContent';
import useStores from '../../stores/useStores';
import axios from "axios";
import {toast} from "react-toastify";

const Board: NextPage = ({ render }) => {
  console.log(render);
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

Board.getInitialProps = async ({ mobxStore, query }: any) => {
  const { PostStore } = mobxStore;
  const { addPost } = PostStore;

  const boardParams = query.board as Array<string>;
  const boardPath = boardParams[0] as string;

  const res = await axios.post('/api/post');

  console.log('end!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(res);
  console.log('end!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  return { render: true };
};

export default Board;
