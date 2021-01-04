import React from 'react';
import { useRouter } from 'next/router';
import BoardHead from './BoardHead';
import BoardContent from './BoardContent';
import useStores from '../../../stores/useStores';

const Board: React.FC = () => {
  const router = useRouter();
  const { AlertStore, SidebarStore } = useStores();
  const { toggleAlertModal } = AlertStore;
  const { bottomCategoryName } = SidebarStore;
  const { board } = router.query;

  if (!board) {
    return (<></>);
  }

  if (!bottomCategoryName[board.toString()]) {
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

export default Board;
